import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Polyhedron(props) {
  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.rotation.x += 0.2 * delta
    ref.current.rotation.y += 0.05 * delta
  })

  return (
    <mesh {...props} ref={ref} castShadow={true}>
      <icosahedronGeometry args={[1, 1]} />
    </mesh>
  )
}