import { Canvas } from '@react-three/fiber'
import { useRef, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Box = forwardRef(function Box(props, ref) {
  useFrame((_, delta) => {
    ref.current.rotation.x += 1 * delta
    ref.current.rotation.y += 0.5 * delta
  })

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  )
})

export default function App() {
  const ref = useRef()

  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <Box ref={ref} />
    </Canvas>
  )
}