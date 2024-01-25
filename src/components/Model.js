import { useEffect } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default function Model() {
  useEffect(() => {
    let canvas = document.getElementById('canvas')
    let parentElement = canvas.parentElement
    let countDelta
    const sizes = {
      width: (parentElement.offsetWidth - 1),
      height: parentElement.offsetHeight
    }
    const color = new THREE.Color()
    // シーン
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xff0000, 0, 750)
    // カメラ
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    )
    camera.position.set(0.5, 7, 25)
    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    // ライト
    const ambientLight = new THREE.AmbientLight(0xFFFFFF)
    scene.add(ambientLight)

    const rect_light = new THREE.RectAreaLight(0xFFFFFF, 500, 1, 1)
    rect_light.rotateY(-Math.PI / 2)
    rect_light.rotateX(-Math.PI / 4)
    rect_light.position.set(0, 15, -5)
    scene.add(rect_light)
    // オブジェクト
    const planeGeometry = new THREE.PlaneGeometry(400, 400, 100, 100)
    const material = new THREE.MeshBasicMaterial({
      color: "orange",
      wireframe: true,
    })
    const plane = new THREE.Mesh(planeGeometry, material)
    plane.rotateX(-Math.PI / 2)
    //scene.add(plane)
    function getRandomColor() {
      return Math.random() * 0xFFFFFF
    }
    const cube_geometry = new THREE.BoxGeometry(1, 1, 1)
    const cube_material = new THREE.MeshBasicMaterial({ color: getRandomColor() })
    const cube = new THREE.Mesh(cube_geometry, cube_material)
    //scene.add(cube)
    const loader = new GLTFLoader()
    loader.load('test.glb', function(gltf) {
      scene.add(gltf.scene)
    }, undefined, function(e) {
      console.error(e)
    })
    let prevTime = performance.now()
    function animate() {
      //requestAnimationFrame(animate)
      const time = performance.now()
      const delta = (time - prevTime) / 1000
      countDelta += delta * 1000
      prevTime = time
      renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)
    // 画面リサイズ設定
    window.addEventListener("resize", onWindowResize)
    function onWindowResize() {
      camera.aspect = (parentElement.offsetWidth - 1) / parentElement.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize((parentElement.offsetWidth - 1), parentElement.offsetHeight)
    }
  }, [])
  return (
    <>
      <canvas id='canvas'></canvas>
    </>
  )
}