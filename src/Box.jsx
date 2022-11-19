import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useKeyboard from './useKeyboard'

export default function Box(props) {
  const ref = useRef()
  const keyMap = useKeyboard()

  useFrame((_, delta) => {
    keyMap['a'] && (ref.current.position.x -= 1 * delta)
    keyMap['d'] && (ref.current.position.x += 1 * delta)
    keyMap['w'] && (ref.current.position.z -= 1 * delta)
    keyMap['s'] && (ref.current.position.z += 1 * delta)
  })

  return (
    <mesh ref={ref} {...props}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  )
}
