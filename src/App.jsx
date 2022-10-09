import { Stats, OrbitControls, Environment } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'

function Model() {
  const { scene, materials } = useLoader(GLTFLoader, './models/scene.glb')

  useMemo(() => {
    materials.Material.envMapIntensity = 0.5
  }, [materials])

  const options = useControls('Suzanne', {
    x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    visible: true,
    color: { value: 'red' }
  })

  return (
    <>
      <primitive
        object={scene}
        children-0-children-0-castShadow={true}
        children-1-receiveShadow={true}
        children-2-castShadow={true}
        children-3-castShadow={true}
        children-4-castShadow={true}
        children-5-castShadow={true}
        children-6-castShadow={true}
        children-7-castShadow={true}
        children-7-rotation={[options.x, options.y, options.z]}
        children-7-visible={options.visible}
        children-7-material-color={options.color}
      />
    </>
  )
}

export default function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0.5, 3] }}
        shadows
        onCreated={(state) => {
          state.gl.physicallyCorrectLights = true
        }}>
        <Environment files="./img/venice_sunset_1k.hdr" />
        <Model />
        <OrbitControls target={[0, 1, 0]} autoRotate />
      </Canvas>
      <Stats />
      <Leva />
    </>
  )
}
