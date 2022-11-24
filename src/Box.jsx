import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useKeyboard from './useKeyboard'

export default function Box(props) {
  const ref = useRef()
  const keyMap = useKeyboard()

  useFrame((_, delta) => {
    keyMap['KeyA'] && (ref.current.position.x -= 1 * delta)
    keyMap['KeyD'] && (ref.current.position.x += 1 * delta)
    keyMap['KeyW'] && (ref.current.position.z -= 1 * delta)
    keyMap['KeyS'] && (ref.current.position.z += 1 * delta)
  })

  return (
    <mesh ref={ref} {...props}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  )
}
