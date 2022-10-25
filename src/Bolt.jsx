import { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { MathUtils, TextureLoader } from 'three'

export default function Bolt(props) {
  const ref = useRef()
  const [count, setCount] = useState(0)
  const [hovered, setHover] = useState(false)
  const normalMap = useLoader(TextureLoader, './img/NormalMap.png')

  useFrame(() => {
    // ref.current.scale.x = ref.current.scale.z = MathUtils.lerp(
    //   ref.current.scale.x,
    //   hovered ? 1.2 : 1,
    //   0.1
    // )
    ref.current.position.z = hovered
      ? MathUtils.lerp(ref.current.position.z, 1, 0.025)
      : MathUtils.lerp(ref.current.position.z, 0, 0.025)
    ref.current.rotation.y = hovered
      ? MathUtils.lerp(ref.current.rotation.y, -Math.PI * 2, 0.025)
      : MathUtils.lerp(ref.current.rotation.y, 0, 0.025)
  })

  const { nodes, materials } = useGLTF('./models/bolt.glb')
  return (
    <group
      {...props}
      ref={ref}
      onPointerDown={() => {
        setCount(count + 1)
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      rotation-x={Math.PI / 2}
      dispose={null}>
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={materials.brass_pan_01}
        material-normalMap={normalMap}
      />
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={materials.brass_pan_01}
        position={[0, -0.02, 0]}
        scale={[0.38, 3.47, 0.38]}
      />
    </group>
  )
}

useGLTF.preload('./models/bolt.glb')
