import { Stats, OrbitControls, Environment } from '@react-three/drei'
import { useLoader,useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function App() {
  const gltf = useLoader(GLTFLoader, './models/scene.glb')
  const scene = useThree()
  useEffect(() => {
    console.log(scene)
  })
  return (
    <>
      <Environment files="./img/garden_nook_2k.hdr" background />
      <primitive object={gltf.scene} children-0-castShadow={true} />
      <OrbitControls target={[0, 1, 0]} autoRotate enableZoom={false} />
      <axesHelper args={[5]} />
      <Stats />
    </>
  )
}
