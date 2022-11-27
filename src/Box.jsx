import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import useKeyboard from './useKeyboard'
import { Vector3, MathUtils } from 'three'

export default function Box(props) {
  const ref = useRef()
  const keyMap = useKeyboard()
  const direction = useMemo(() => new Vector3(), [])

  function getForwardVector(camera, playerDirection) {
    camera.getWorldDirection(playerDirection)
    playerDirection.y = 0
    playerDirection.normalize()
    return playerDirection
  }

  function getSideVector(camera, playerDirection) {
    camera.getWorldDirection(playerDirection)
    playerDirection.y = 0
    playerDirection.normalize()
    playerDirection.cross(camera.up)
    return playerDirection
  }

  useFrame(({ camera }, delta) => {
    keyMap['KeyA'] &&
      ref.current.position.add(
        getSideVector(camera, direction).multiplyScalar(-delta)
      )
    keyMap['KeyD'] &&
      ref.current.position.add(
        getSideVector(camera, direction).multiplyScalar(delta)
      )
    keyMap['KeyW'] &&
      ref.current.position.add(
        getForwardVector(camera, direction).multiplyScalar(delta)
      )
    keyMap['KeyS'] &&
      ref.current.position.add(
        getForwardVector(camera, direction).multiplyScalar(-delta)
      )

    ref.current.rotation.y = MathUtils.lerp(
      ref.current.rotation.y,
      camera.rotation.y,
      0.25
    )
  })

  return (
    <mesh ref={ref} {...props} rotation-order={'XYZ'}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  )
}
