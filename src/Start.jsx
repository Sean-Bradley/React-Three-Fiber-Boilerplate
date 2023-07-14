import { useRef } from 'react'
import { useBox } from '@react-three/cannon'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

export default function Start({ args }) {
  const [ref] = useBox(() => ({ args: args, mass: 0, position: [0, 0, 0], material: 'ground' }), useRef())
  const texture = useLoader(TextureLoader, './img/grid.png')

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
