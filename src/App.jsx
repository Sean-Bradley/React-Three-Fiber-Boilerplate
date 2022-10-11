import {
  Stats,
  OrbitControls,
  useGLTF,
  Environment,
  useHelper
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { Leva, useControls } from 'leva'
import { CameraHelper } from 'three'

function Lights() {
  const ref = useRef()
  const helperRef = useRef()
  useHelper(helperRef, CameraHelper)

  useControls('Directional Light', {
    position: {
      x: 21.0,
      y: 11.0,
      z: 6.0,
      onChange: (v) => {
        ref.current.position.copy(v)
      }
    },
    near: {
      value: 1,
      min: 1,
      max: 50,
      step: 0.1,
      onChange: (v) => {
        ref.current.shadow.camera.near = v
        ref.current.shadow.camera.updateProjectionMatrix()
      }
    },
    far: {
      value: 50,
      min: 1,
      max: 50,
      step: 0.1,
      onChange: (v) => {
        ref.current.shadow.camera.far = v
        ref.current.shadow.camera.updateProjectionMatrix()
      }
    },
    left: {
      value: -15,
      min: -30,
      max: 30,
      step: 0.1,
      onChange: (v) => {
        ref.current.shadow.camera.left = v
        ref.current.shadow.camera.updateProjectionMatrix()
      }
    },
    right: {
      value: 15,
      min: -30,
      max: 30,
      step: 0.1,
      onChange: (v) => {
        ref.current.shadow.camera.right = v
        ref.current.shadow.camera.updateProjectionMatrix()
      }
    },
    top: {
      value: 10,
      min: -30,
      max: 30,
      step: 0.1,
      onChange: (v) => {
        ref.current.shadow.camera.top = v
        ref.current.shadow.camera.updateProjectionMatrix()
      }
    },
    bottom: {
      value: -10,
      min: -30,
      max: 30,
      step: 0.1,
      onChange: (v) => {
        ref.current.shadow.camera.bottom = v
        ref.current.shadow.camera.updateProjectionMatrix()
      }
    }
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        ref={ref}
        castShadow={true}
        shadow-bias={-0.003}
        shadow-mapSize={[512, 512]}>
        <orthographicCamera ref={helperRef} attach="shadow-camera" />
      </directionalLight>
    </>
  )
}

function Scene() {
  const gltf = useGLTF('./models/collision-world.glb')

  return (
    <>
      <primitive
        object={gltf.scene}
        position={[0, 0, 0]}
        children-0-castShadow={true}
        children-0-receiveShadow={true}
      />
    </>
  )
}
export default function App() {
  return (
    <>
      <Canvas camera={{ position: [-10, 10, -15] }} shadows>
        <Lights />
        <Environment preset="night" background />
        <Scene />
        <OrbitControls target={[0, 4, 0]} />
        <Stats />
      </Canvas>
      <Leva />
    </>
  )
}
