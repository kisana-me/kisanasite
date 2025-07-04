import React, { useEffect, useRef, useState, useCallback } from 'react'
// three.jsと関連ライブラリをインポート
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

// --- 表示する展示物のデータ ---
const exhibitsData = [
    { type: 'HTML', content: { image: 'https://kisana.me/images/anyur/anyur-logo.png', title: 'ANYUR', description: 'アカウントを管理', link: 'https://anyur.com' } },
    { type: 'HTML', content: { image: 'https://kisana.me/images/amiverse/amiverse-logo.png', title: 'Amiverse', description: '楽しいソーシャルメディア', link: 'https://amiverse.net' } },
    { type: 'HTML', content: { image: 'https://kisana.me/images/ivecolor/ivecolor-logo.png', title: 'IVECOLOR', description: 'ブログサイト', link: 'https://ivecolor.com' } },
    { type: 'HTML', content: { image: 'https://kisana.me/images/bealive/bealive-logo.png', title: 'BeAlive.', description: '生存確認' } },
    { type: 'HTML', content: { image: 'https://kisana.me/images/x/x-logo.png', title: '得句巣', description: '漢字のみ' } },
    { type: 'HTML', content: { image: 'https://kisana.me/images/kisana/kisana-logo.png', title: 'KISANA:ME', description: 'このサイト' } },
    { type: 'Sphere', content: { color: 0xff6b6b } },
    { type: 'Cube', content: { color: 0x4a90e2 } },
    { type: 'Torus', content: { color: 0x48dbfb } },
]

function ModelViewer() {
  const mountRef = useRef(null)
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
      if (data.type !== 'HTML') return null
      return (
        <div
          key={index}
          ref={el => { if (el) htmlItemsRef.current[index] = el }}
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
    }).filter(Boolean)

  // ターゲットを切り替える関数
  const changeTarget = useCallback((index) => {
    const { animationTargets, targets } = threeStuffRef.current
    if (!animationTargets || !targets) return

    setCurrentTargetIndex(index)
    const targetObject = targets[index].object

    // アニメーションの目標値を設定
    animationTargets.cameraPos.set(targetObject.position.x, targetObject.position.y + 1.5, targetObject.position.z + 7)
    animationTargets.controlsTarget.copy(targetObject.position)
    animationTargets.spotLightPos.set(targetObject.position.x, targetObject.position.y + 10, targetObject.position.z + 5)
    animationTargets.spotLightTarget.copy(targetObject.position)

    // 回転リセットの目標値を設定
    animationTargets.resetRotation = {
      object: targetObject,
      targetY: 0
    }

    // 照明クラスの管理
    exhibitsData.forEach((d, i) => {
      if (d.type === 'HTML') {
        const lighting = document.getElementById(`html-lighting-${i}`)
        if (lighting) lighting.className = 'lighting-overlay dimmed'
      }
    })
    if (targets[index].isHtml) {
      const lighting = document.getElementById(`html-lighting-${index}`)
      if (lighting) {
        setTimeout(() => { lighting.className = 'lighting-overlay lit' }, 300)
      }
    }
  }, [])

  // モデルの回転をリセットする関数
  const handleResetRotation = () => {
    const { targets, animationTargets } = threeStuffRef.current
    if (!targets || !targets[currentTargetIndex]) return

    const object = targets[currentTargetIndex].object
    // 回転リセットの目標値を設定
    animationTargets.resetRotation = {
      object: object,
      targetY: 0
    }
  }

  useEffect(() => {
    const currentMount = mountRef.current

    // アニメーションの目標値を保持するオブジェクト
    const animationTargets = {
      cameraPos: new THREE.Vector3(),
      controlsTarget: new THREE.Vector3(),
      spotLightPos: new THREE.Vector3(),
      spotLightTarget: new THREE.Vector3(),
      resetRotation: null
    }

    const scene = new THREE.Scene()
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
      let obj, isHtml = false
      const xPos = (index - (exhibitsData.length - 1) / 2) * modelSpacing

      if (data.type === 'Sphere') obj = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshStandardMaterial({ ...data.content }))
      else if (data.type === 'Cube') obj = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), new THREE.MeshStandardMaterial({ ...data.content }))
      else if (data.type === 'Torus') obj = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.5, 32, 100), new THREE.MeshStandardMaterial({ ...data.content }))
      else if (data.type === 'HTML') {
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

    const handleResize = () => { /* ... */ }
    window.addEventListener('resize', handleResize)

    return () => { /* ...クリーンアップ処理... */ }
  }, [changeTarget])

  const handlePrev = () => changeTarget((currentTargetIndex - 1 + exhibitsData.length) % exhibitsData.length)
  const handleNext = () => changeTarget((currentTargetIndex + 1) % exhibitsData.length)

  return (
    <>
      <style>{`
        .viewer-container { position: relative; width: 100vw; height: 100vh; background-color: transparent; overflow: hidden; }
        .viewer-container > div, .viewer-container > canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .css3d-container { pointer-events: none; }
        .html-item { width: 300px; height: 400px; background-color: #111; border-radius: 10px; pointer-events: auto; color: white; padding: 20px; box-sizing: border-box; box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; transition: opacity 0.3s; }
        .html-item.hidden { opacity: 0 !important; pointer-events: none; }
        .html-item:hover { cursor: pointer; border: 1px solid rgba(255, 255, 255, 0.5); }
        .html-item img { width: 100%; height: 280px; object-fit: cover; border-radius: 5px; }
        .html-item h3 { margin: 15px 0 5px 0; font-family: sans-serif; font-weight: bold; }
        .html-item p { margin: 0; font-family: sans-serif; font-size: 14px; color: #ccc; text-align: center; }
        .lighting-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 120%); transition: opacity 1.2s ease-in-out; }
        .lighting-overlay.lit { opacity: 0; }
        .lighting-overlay.dimmed { opacity: 1; }
        .controls-container { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; gap: 20px; z-index: 10; }
        .nav-button { width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 50%; color: white; font-size: 24px; cursor: pointer; transition: background-color 0.3s, transform 0.1s; user-select: none; border: none; }
        .nav-button:hover { background-color: rgba(255, 255, 255, 0.2); }
        .nav-button:active { transform: scale(0.95); }
      `}</style>
      <div ref={mountRef} className="viewer-container"></div>
      <div style={{ display: 'none' }}>{htmlContent}</div>
      <div className="controls-container">
        <button onClick={handlePrev} className="nav-button">&lt;</button>
        <button onClick={handleResetRotation} className="nav-button">↻</button>
        <button onClick={handleNext} className="nav-button">&gt;</button>
      </div>
    </>
  )
}

export default ModelViewer
