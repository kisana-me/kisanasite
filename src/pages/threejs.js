import Head from "@/components/Head"
import { useEffect } from "react"
import * as THREE from "three"
import { TransformControls } from "three/examples/jsm/controls/TransformControls"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Stats } from "three/examples/jsm/libs/stats.module"
import GUI from "lil-gui"
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { usePageContext } from "@/contexts/PageContext"

export default function threejs() {
  const { setTitle, setRobots } = usePageContext()
  useEffect(()=>{
    setTitle('Three.js')
    setRobots('noindex, nofollow')
  }, [])

  useEffect(() => {
    let canvas = document.getElementById('canvas')
    let parentElement = canvas.parentElement
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
    renderer.physicallyCorrectLights = true
    // GUI
    const gui = new GUI()
    const guiConfig = {
      transform_controls: false,
      ambient_light: false,
      rect_light: false,
      direction_light: false,
      resetWindow: () => {
        document.location.reload()
      },
    }
    const lightGUI = gui.addFolder('Light')
    const objectGUI = gui.addFolder('Object')
    // スポットライト
    const spotLightGUI = gui.addFolder('Spot light')
    const spotLightConfig = {
      visible: false,
      controls: false,
      helper: false
    }
    const spotLight = new THREE.SpotLight(0x78ff00, 50, 10, Math.PI * 0.1, 0.25, 1)
    const spotLightHelper = new THREE.SpotLightHelper(spotLight, 1)
    spotLight.position.set(0, 2, 3)
    scene.add(spotLight)
    scene.add(spotLightHelper)
    spotLightGUI.add(spotLight.position, 'y', -5, 5, 0.1).name('y座')
    // ポイントライト
    const pointLightGUI = gui.addFolder('Point light')
    const pointLightConfig = {
      visible: false,
      controls: false,
      helper: false
    }
    const pointLight = new THREE.PointLight( 0xffffff, 1, 100 )
    pointLight.position.set(0, 1, 0)
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
    pointLightGUI.add(pointLight.position, 'y', -5, 5, 0.1).name('y座')
    pointLightGUI.add(pointLight, 'intensity', -50, 50, 1, ).name('発光の強さ')
    pointLightGUI.add(pointLightConfig, 'visible')
      .name('可視化')
      .onChange(value => {
        if(value){
          scene.add(pointLight)
        } else {
          scene.remove(pointLight)
        }
      })
    pointLightGUI.add(pointLightConfig, 'helper')
      .name('helper')
      .onChange(value => {
        if(value){
          scene.add(pointLightHelper)
        } else {
          scene.remove(pointLightHelper)
        }
      })
    // アンビエントライト
    const ambientLight = new THREE.AmbientLight(0xFFFFFF)
    lightGUI.add( guiConfig, 'ambient_light' )
      .name('ambient')
      .onChange( value => {
        if(value){
          scene.add(ambientLight)
        } else {
          scene.remove(ambientLight)
        }
      })
    // レクトエリアライト
    const rectAreaLight = new THREE.RectAreaLight(0xFFFFFF, 800, 10, 10)
    const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
    //rect_light.rotateY(-Math.PI / 2)
    rectAreaLight.rotateX(Math.PI / 4)
    rectAreaLight.position.set( 5, 5, 0 )
    rectAreaLight.lookAt( 0, 0, 0 )
    //scene.add(rectAreaLight)
    //scene.add(rectAreaLightHelper)
    // ディレクションライト
    const direction_light = new THREE.DirectionalLight(0xFFFFFF, 3)
    direction_light.position.set(1, 1, 0)
    const direction_light_helper = new THREE.DirectionalLightHelper(direction_light, 1)
    lightGUI.add( guiConfig, 'direction_light' )
      .name('direction')
      .onChange( value => {
        if(value){
          scene.add(direction_light)
          scene.add(direction_light_helper)
        } else {
          scene.remove(direction_light)
          scene.remove(direction_light_helper)
        }
      })
    // オブジェクト
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1)
    const material = new THREE.MeshLambertMaterial({
      color: "white",
      wireframe: false,
    })
    const plane = new THREE.Mesh(planeGeometry, material)
    plane.rotateX(-Math.PI / 2)
    scene.add(plane)
    function getRandomColor() {
      return Math.random() * 0xFFFFFF
    }
    const cube_geometry = new THREE.BoxGeometry(1, 1, 1)
    const cube_material = new THREE.MeshLambertMaterial({ color: getRandomColor() })
    const cube = new THREE.Mesh(cube_geometry, cube_material)
    scene.add(cube)
    /*const loader = new GLTFLoader()
    loader.load('test.glb', function(gltf) {
      scene.add(gltf.scene)
    }, undefined, function(e) {
      console.error(e)
    })*/
    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = false
    // TransformControls
    const transformControls = new TransformControls(
      camera, renderer.domElement
    )
    function start_controls(e) {
      controls.enablePan = false;
      controls.enableRotate = false;
    }
    function stop_controls(e) {
      controls.enablePan = true;
      controls.enableRotate = true;
    }
    transformControls.addEventListener(
      'mouseDown', (e)=>{start_controls(e)}
    )
    transformControls.addEventListener(
      'mouseUp', (e)=>{stop_controls(e)}
    )
    objectGUI.add( guiConfig, 'transform_controls' )
    .name('transform controls')
    .onChange( value => {
      if(value){
        transformControls.attach(cube)
        scene.add(transformControls)
      } else {
        transformControls.detach(cube)
        scene.remove(transformControls)
      }
    })
    //const stats = new Stats()
    //document.body.appendChild(stats.dom)
    function animate() {
      renderer.render(scene, camera)
      //stats.update()
      spotLightHelper.update()
    }
    renderer.setAnimationLoop(animate)
    animate()
    window.addEventListener("resize", onWindowResize)
    function onWindowResize() {
      camera.aspect = (parentElement.offsetWidth - 1) / parentElement.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize((parentElement.offsetWidth - 1), parentElement.offsetHeight)
    }
  }, [])
  return (
    <>
      <div className="wrap">
        <div className="canvas">
          <canvas id='canvas'></canvas>
        </div>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
        .canvas {
          width: 100%;
          height: calc(100vh - 122px);
        }
      `}</style>
    </>
  )
}