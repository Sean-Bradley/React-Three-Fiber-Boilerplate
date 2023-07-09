import { useRef } from 'react'
import { useBox } from '@react-three/cannon'

export default function Platform({ args, position }) {
  const [ref] = useBox(() => ({ args: args, mass: 0, position: position, material: 'ground' }), useRef())

  return (
    <mesh ref={ref} receiveShadow position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial />
    </mesh>
  )
}
