import React, { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import { useThemeContext } from '@/contexts/theme_context'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

const ModelViewer = forwardRef(({ exhibitsData, ...props }, ref) => {
  const mountRef = useRef(null)
  const { darkMode } = useThemeContext()
  const htmlItemsRef = useRef([])
  const threeStuffRef = useRef({})
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // クリックイベントハンドラ
  const handleItemClick = (link) => {
    if (link) window.open(link, '_blank')
  }

  const htmlContent = exhibitsData
    .map((data, index) => {
      if (data.type !== 'CARD') return null
      return (
        <div
          key={index}
          ref={(el) => {
            if (el) htmlItemsRef.current[index] = el
          }}
          className="html-item"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleItemClick(data.content.link)}
        >
          <div id={`html-lighting-${index}`} className="lighting-overlay"></div>
          <img src={data.content.image} alt={data.content.title} />
          <h3>{data.content.title}</h3>
          <p>{data.content.description}</p>
        </div>
      )
    })
    .filter(Boolean)

  // ターゲットを切り替える関数
  const changeTarget = useCallback((index) => {
    const { animationTargets, targets } = threeStuffRef.current
    if (!animationTargets || !targets) return

    setCurrentTargetIndex(index)
    if (props.onTargetChange) {
      props.onTargetChange(index)
    }
    const targetObject = targets[index].object

    // アニメーションの目標値を設定
    animationTargets.cameraPos.set(targetObject.position.x, targetObject.position.y + 1.5, targetObject.position.z + 7)
    animationTargets.controlsTarget.copy(targetObject.position)
    animationTargets.spotLightPos.set(targetObject.position.x, targetObject.position.y + 10, targetObject.position.z + 5)
    animationTargets.spotLightTarget.copy(targetObject.position)

    // 回転リセットの目標値を設定
    animationTargets.resetRotation = {
      object: targetObject,
      targetY: 0,
    }

    // 照明クラスの管理
    exhibitsData.forEach((d, i) => {
      if (d.type === 'CARD') {
        const lighting = document.getElementById(`html-lighting-${i}`)
        if (lighting) lighting.className = 'lighting-overlay dimmed'
      }
    })
    if (targets[index].isHtml) {
      const lighting = document.getElementById(`html-lighting-${index}`)
      if (lighting) {
        setTimeout(() => {
          lighting.className = 'lighting-overlay lit'
        }, 300)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // モデルの回転をリセットする関数
  const handleResetRotation = () => {
    const { targets, animationTargets } = threeStuffRef.current
    if (!targets || !targets[currentTargetIndex]) return

    const object = targets[currentTargetIndex].object
    // 回転リセットの目標値を設定
    animationTargets.resetRotation = {
      object: object,
      targetY: 0,
    }
  }

  useEffect(() => {
    const { scene } = threeStuffRef.current
    if (scene) {
      scene.background = new THREE.Color(darkMode ? 0x000000 : 0xffffff)
    }
  }, [darkMode])

  useEffect(() => {
    const currentMount = mountRef.current

    // アニメーションの目標値を保持するオブジェクト
    const animationTargets = {
      cameraPos: new THREE.Vector3(),
      controlsTarget: new THREE.Vector3(),
      spotLightPos: new THREE.Vector3(),
      spotLightTarget: new THREE.Vector3(),
      resetRotation: null,
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(darkMode ? 0x000000 : 0xffffff)
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    currentMount.appendChild(renderer.domElement)

    const cssRenderer = new CSS3DRenderer()
    cssRenderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    cssRenderer.domElement.className = 'css3d-container'
    currentMount.appendChild(cssRenderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15)
    scene.add(ambientLight)
    const spotLight = new THREE.SpotLight(0xffffff, 120, 30, Math.PI * 0.15, 0.5, 1)
    spotLight.castShadow = true
    spotLight.shadow.mapSize.set(2048, 2048)
    scene.add(spotLight, spotLight.target)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enableZoom = false

    const targets = []
    const occludableHtmls = []
    const modelSpacing = 8
    const initialY = 1.7

    const pedestalGeo = new THREE.CylinderGeometry(2.5, 2.7, 0.5, 64)
    const pedestalMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 })

    exhibitsData.forEach((data, index) => {
      let obj,
        isHtml = false
      const xPos = (index - (exhibitsData.length - 1) / 2) * modelSpacing

      if (data.type === 'CARD') {
        isHtml = true
        const htmlElement = htmlItemsRef.current[index]
        if (htmlElement) {
          obj = new CSS3DObject(htmlElement)
          const planeGeo = new THREE.PlaneGeometry(3, 4)
          const planeMat = new THREE.MeshBasicMaterial({ colorWrite: false })
          const proxy = new THREE.Mesh(planeGeo, planeMat)
          scene.add(proxy)
          occludableHtmls.push({ htmlElement, proxy, object: obj })
        }
      } else if (data.type === 'Sphere') {
        obj = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshStandardMaterial({ ...data.content }))
      } else if (data.type === 'Cube') {
        obj = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), new THREE.MeshStandardMaterial({ ...data.content }))
      } else if (data.type === 'Torus') {
        obj = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.5, 32, 100), new THREE.MeshStandardMaterial({ ...data.content }))
      }

      if (obj) {
        obj.position.set(xPos, isHtml ? initialY + 0.5 : initialY, 0)
        if (obj instanceof THREE.Mesh) obj.castShadow = true
        else if (obj instanceof CSS3DObject) obj.scale.set(0.01, 0.01, 0.01)

        scene.add(obj)
        targets.push({ object: obj, isHtml })

        const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat)
        pedestal.receiveShadow = true
        pedestal.position.set(xPos, 0, 0)
        scene.add(pedestal)
      }
    })

    threeStuffRef.current = { scene, camera, renderer, cssRenderer, controls, spotLight, targets, occludableHtmls, animationTargets }

    // 初期ターゲットを設定
    const initialIndex = 0
    const initialObject = targets[initialIndex].object
    camera.position.set(initialObject.position.x, initialObject.position.y + 1.5, initialObject.position.z + 7)
    controls.target.copy(initialObject.position)
    spotLight.position.set(initialObject.position.x, initialObject.position.y + 10, initialObject.position.z + 5)
    spotLight.target.position.copy(initialObject.position)
    changeTarget(initialIndex)

    const clock = new THREE.Clock()
    const raycaster = new THREE.Raycaster()
    let animationFrameId

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      const lerpFactor = 0.05

      // カメラとライトの移動アニメーション
      camera.position.lerp(animationTargets.cameraPos, lerpFactor)
      controls.target.lerp(animationTargets.controlsTarget, lerpFactor)
      spotLight.position.lerp(animationTargets.spotLightPos, lerpFactor)
      spotLight.target.position.lerp(animationTargets.spotLightTarget, lerpFactor)

      // 回転リセットのアニメーション
      if (animationTargets.resetRotation) {
        const { object, targetY } = animationTargets.resetRotation
        object.rotation.y = THREE.MathUtils.lerp(object.rotation.y, targetY, 0.1)
        if (Math.abs(object.rotation.y - targetY) < 0.01) {
          object.rotation.y = targetY
          animationTargets.resetRotation = null
        }
      }

      targets.forEach(({ object, isHtml }, index) => {
        // 回転リセット中、またはホバー中はアイドル回転を停止
        if (!animationTargets.resetRotation || animationTargets.resetRotation.object !== object) {
          if (isHtml && index === hoveredIndex) {
            const targetAngle = Math.atan2(camera.position.x - object.position.x, camera.position.z - object.position.z)
            let delta = targetAngle - object.rotation.y
            if (delta > Math.PI) delta -= 2 * Math.PI
            if (delta < -Math.PI) delta += 2 * Math.PI
            object.rotation.y += delta * 0.05
          } else {
            object.rotation.y += 0.002
          }
        }

        const yOffset = isHtml ? 0.5 : 0
        object.position.y = initialY + yOffset + Math.sin(elapsedTime * 1.2 + object.position.x) * 0.2
      })

      // ... (隠面処理は同じ)
      camera.updateMatrixWorld()
      occludableHtmls.forEach(({ htmlElement, proxy, object }) => {
        proxy.position.copy(object.position)
        proxy.rotation.copy(object.rotation)
        proxy.scale.copy(object.scale)

        const proxyPos = new THREE.Vector3()
        proxy.getWorldPosition(proxyPos)
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
        const dir = proxyPos.clone().sub(camera.position).normalize()
        raycaster.set(camera.position, dir)

        const intersects = raycaster.intersectObjects(scene.children, true)
        let isOccluded = false
        if (intersects.length > 0) {
          if (intersects[0].object !== proxy && intersects[0].distance < camera.position.distanceTo(proxy.position)) {
            isOccluded = true
          }
        }
        htmlElement.classList.toggle('hidden', isOccluded)
      })

      controls.update()
      renderer.render(scene, camera)
      cssRenderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (threeStuffRef.current.camera && threeStuffRef.current.renderer && threeStuffRef.current.cssRenderer) {
        const { camera, renderer, cssRenderer } = threeStuffRef.current
        const currentMount = mountRef.current
        if (currentMount) {
          camera.aspect = currentMount.clientWidth / currentMount.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
          cssRenderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
        }
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement)
      }
      if (currentMount && cssRenderer.domElement) {
        currentMount.removeChild(cssRenderer.domElement)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeTarget])

  const handlePrev = () => changeTarget((currentTargetIndex - 1 + exhibitsData.length) % exhibitsData.length)
  const handleNext = () => changeTarget((currentTargetIndex + 1) % exhibitsData.length)

  useImperativeHandle(ref, () => ({
    prev: handlePrev,
    next: handleNext,
    resetRotation: handleResetRotation,
  }))

  const backgroundColor = darkMode ? '#000' : '#fff'

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .viewer-container { position: relative; width: 100%; height: 100%; background-color: transparent; overflow: hidden; }
        .viewer-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background:
            linear-gradient(to bottom, ${backgroundColor} 0%, transparent 15%, transparent 85%, ${backgroundColor} 100%),
            linear-gradient(to right, ${backgroundColor} 0%, transparent 15%, transparent 85%, ${backgroundColor} 100%);
        }
        .viewer-container > div, .viewer-container > canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .css3d-container { pointer-events: none; }
        .html-item { width: 300px; height: 400px; background-color: #111; border-radius: 10px; pointer-events: auto; color: white; padding: 20px; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; transition: opacity 0.3s; }
        .html-item.hidden { opacity: 0 !important; pointer-events: none; }
        .html-item:hover { cursor: pointer; border: 1px solid rgba(255, 255, 255, 0.5); }
        .html-item img { width: 100%; height: 280px; object-fit: cover; border-radius: 5px; }
        .html-item h3 { margin: 15px 0 5px 0; font-family: sans-serif; font-weight: bold; }
        .html-item p { margin: 0; font-family: sans-serif; font-size: 14px; color: #ccc; text-align: center; }
        .lighting-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 120%); transition: opacity 1.2s ease-in-out; }
        .lighting-overlay.lit { opacity: 0; }
        .lighting-overlay.dimmed { opacity: 1; }
      `,
        }}
      />
      <div ref={mountRef} className="viewer-container"></div>
      <div style={{ display: 'none' }}>{htmlContent}</div>
    </>
  )
})
ModelViewer.displayName = 'ModelViewer'

export default ModelViewer
