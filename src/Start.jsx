import { useRef } from 'react'
import { useBox } from '@react-three/cannon'

export default function Start({ args }) {
  const [ref] = useBox(() => ({ args: args, mass: 0, position: [0, 0, 0], material: 'ground' }), useRef())

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial />
    </mesh>
  )
}
