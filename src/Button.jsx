import { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { MathUtils, TextureLoader } from 'three'

export default function Button(props) {
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
      ? MathUtils.lerp(ref.current.position.z, 0.5, 0.025)
      : MathUtils.lerp(ref.current.position.z, 0, 0.025)
    ref.current.rotation.y = hovered
      ? MathUtils.lerp(ref.current.rotation.y, -Math.PI * 2, 0.025)
      : MathUtils.lerp(ref.current.rotation.y, 0, 0.025)
  })

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setCount(count + 1)
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      rotation-x={-Math.PI / 2}
      castShadow>
      <cylinderGeometry args={[1, 1, 0.25, 8, 1]} />
      <meshPhysicalMaterial
        roughness={0.25}
        metalness={0.9}
        normalMap={normalMap}
      />
    </mesh>
  )
}
