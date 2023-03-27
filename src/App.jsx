import { Stats, OrbitControls, Environment } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { TextureLoader } from 'three'

function Earth() {
  const ref = useRef()
  const { gl } = useThree()
  const texture = useLoader(TextureLoader, './img/worldColour.5400x2700.jpg')
  const displacementMap = useLoader(TextureLoader, './img/gebco_bathy_2700x1350.jpg')

  const material = useControls({
    wireframe: false,
    displacementScale: { value: 0.5, min: 0, max: 1.0, step: 0.01 }
  })

  useEffect(() => {
    texture.anisotropy = gl.capabilities.getMaxAnisotropy()
  }, [texture, gl])

  useFrame((_, delta) => {
    ref.current.rotation.y += delta / 4
  })

  return (
    <mesh ref={ref} castShadow={true} receiveShadow={true}>
      <icosahedronGeometry args={[1, 128]} />
      <meshStandardMaterial
        wireframe={material.wireframe}
        map={texture}
        displacementMap={displacementMap}
        displacementScale={material.displacementScale}
      />
    </mesh>
  )
}
export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 1.75] }}>
      <Environment files="./img/venice_sunset_1k.hdr" />
      <directionalLight
        intensity={2}
        position={[4, 0, 2]}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={-2}
        shadow-camera-bottom={2}
        shadow-camera-near={0.1}
        shadow-camera-far={7}
      />
      <directionalLight
        intensity={2}
        position={[3, 0, 3]}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={-2}
        shadow-camera-bottom={2}
        shadow-camera-near={0.1}
        shadow-camera-far={7}
      />
      <Earth />
      <OrbitControls />
      <Stats />
    </Canvas>
  )
}
