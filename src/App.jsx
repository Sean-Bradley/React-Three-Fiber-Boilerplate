import { Stats, OrbitControls, Circle } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function App() {
  const directionalRef = useRef()
  const gltf = useLoader(GLTFLoader, './models/monkey.glb')

  return (
    <>
      <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
        <directionalLight ref={directionalRef} position={[3.3, 1.0, 4.4]} castShadow={true} />
        <primitive object={gltf.scene} position={[0, 1, 0]} children-0-castShadow={true} />
        <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow={true}>
          <meshStandardMaterial />
        </Circle>
        <OrbitControls target={[0, 1, 0]} />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
    </>
  )
}
