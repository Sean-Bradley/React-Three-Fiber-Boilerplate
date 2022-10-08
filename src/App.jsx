import { Stats, OrbitControls, Circle } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { MeshStandardMaterial } from 'three'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function App() {
  const directionalRef = useRef()
  const gltf = useLoader(GLTFLoader, './models/monkey.glb')

  useEffect(() => {
    gltf.scene.children.forEach((c) => {
      if (c.isMesh) {
        c.castShadow = true
      }
    })
  })

  return (
    <>
      <directionalLight ref={directionalRef} position={[3.3, 1.0, 4.4]} castShadow={true} />
      <primitive object={gltf.scene} position={[0, 1, 0]} onChange={console.log(gltf.scene)} />
      <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow={true} material={new MeshStandardMaterial()} />
      <OrbitControls target={[0, 1, 0]} />
      <axesHelper args={[5]} />
      <Stats />
    </>
  )
}
