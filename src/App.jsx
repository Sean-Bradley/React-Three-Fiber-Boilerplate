import { Stats, OrbitControls, Environment } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useMemo, useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas } from '@react-three/fiber'
import { StrictMode } from 'react'
import { Leva, useControls } from 'leva'

function Scene() {
  const { scene, materials } = useLoader(GLTFLoader, './models/scene.glb')

  useMemo(() => {
    console.log('useMemo')
    materials.Material.envMapIntensity = 0.5
    // scene.traverse((o) => {
    //   if (o.isMesh) {
    //     if (o.name === 'Cube') o.receiveShadow = true
    //     else o.castShadow = true
    //   }
    //   if (o.isLight) {
    //     o.castShadow = true
    //   }
    // })
  }, [materials])

  useEffect(() => {
    console.log('useEffect')
  })

  const options = {
    x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    visible: true,
    color: { value: 'red' }
  }

  const pA = useControls('Polygon A', options)

  return (
    <>
      <Environment files="./img/venice_sunset_1k.hdr" />
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
        children-7-rotation={[pA.x, pA.y, pA.z]}
        children-7-visible={pA.visible}
        children-7-material-color={pA.color}
      />
      <OrbitControls target={[0, 1, 0]} autoRotate />
    </>
  )
}

export default function App() {
  return (
    <StrictMode>
      <Canvas
        camera={{ position: [0, 1.5, 3] }}
        shadows
        onCreated={(state) => {
          state.gl.physicallyCorrectLights = true
        }}>
        <Scene />        
      </Canvas>
      <Stats />
      <Leva />
    </StrictMode>
  )
}
