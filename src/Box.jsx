import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Box(props) {
  const ref = useRef()
  const [rotate, setRotate] = useState(false)
  const [hovered, setHover] = useState(false)

  useFrame((_, delta) => {
    if (rotate) {
      ref.current.rotation.x += 1 * delta
      ref.current.rotation.y += 0.5 * delta
    }
  })

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => setRotate(!rotate)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry />
      <meshBasicMaterial
        color={hovered ? 0xff0000 : 0x00ff00}
        wireframe={true}
      />
    </mesh>
  )
}
