import { Stats, OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Leva, useControls } from 'leva'
import { MeshBasicMaterial } from 'three'

function Lights() {
  const ref = useRef()

  useControls('Directional Light', {
    position: {
      x: 65.0,
      y: 21.0,
      z: 86.0,
      onChange: (v) => {
        ref.current.position.copy(v)
        console.log(ref.current)
      }
    },
    left: {
      value: -30,
      min: -30,
      max: 30,
      step: 0.1,
      onChange: (v) => {
        ref.current.shadow.camera.left = v
        ref.current.shadow.camera.updateProjectionMatrix()
      }
    },
    right: {
      value: 30,
      min: -30,
      max: 30,
      step: 0.1,
      onChange: (v) => {
        ref.current.shadow.camera.right = v
        ref.current.shadow.camera.updateProjectionMatrix()
      }
    },
    top: {
      value: 30,
      min: -30,
      max: 30,
      step: 0.1,
      onChange: (v) => {
        ref.current.shadow.camera.top = v
        ref.current.shadow.camera.updateProjectionMatrix()
      }
    },
    bottom: {
      value: -30,
      min: -30,
      max: 30,
      step: 0.1,
      onChange: (v) => {
        ref.current.shadow.camera.bottom = v
        ref.current.shadow.camera.updateProjectionMatrix()
      }
    }
  })

  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime() / 5
  //   ref.current.position.x = Math.cos(t) * 20
  //   ref.current.position.z = Math.sin(t) * 20
  // })

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        ref={ref}
        castShadow={true}
        shadow-bias={-0.003}
        shadow-mapSize={[2048, 2048]}>
        <mesh>
          <sphereBufferGeometry />
          <meshBasicMaterial />
        </mesh>
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
      <Canvas camera={{ position: [10, 10, 10] }} shadows>
        <Lights />
        <Environment preset="dawn" background />
        <Scene />
        <OrbitControls target={[0, 1, 0]} />
        <Stats />
      </Canvas>
      <Leva />
    </>
  )
}
