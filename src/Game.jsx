import { useGLTF } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { Vector3 } from 'three'
import { Physics, RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import useKeyboard from './useKeyboard'

const ballCount = 100
const radius = 0.2
const balls = [...Array(ballCount)].map(() => ({ position: [Math.random() * 50 - 25, 20, Math.random() * 50 - 25] }))

export default function Game() {
  const ref = useRef()
  const { nodes } = useGLTF('./models/scene-transformed.glb')
  const playerVelocity = useMemo(() => new Vector3(), [])
  const playerDirection = useMemo(() => new Vector3(), [])

  const keyboard = useKeyboard()

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

  function controls(camera, delta, playerVelocity, playerDirection) {
    const speedDelta = delta * 8
    keyboard['KeyA'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(-speedDelta))
    keyboard['KeyD'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyW'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyS'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta))
    if (keyboard['Space']) {
      playerVelocity.y = 3
    }
  }

  useFrame(({ camera }, delta) => {
    controls(camera, delta, playerVelocity, playerDirection)

    let damping = Math.exp(-4 * delta) - 1
    playerVelocity.addScaledVector(playerVelocity, damping)

    ref.current.applyImpulse(playerVelocity)
    camera.position.copy(ref.current.translation())
  })

  return (
    <>
      <Physics debug>
        <RigidBody colliders="trimesh" mass="0">
          <mesh castShadow receiveShadow geometry={nodes.Suzanne007.geometry} material={nodes.Suzanne007.material} position={[1.74, 1.04, 24.97]} />
        </RigidBody>
        <RigidBody ref={ref} colliders="ball" position={[0, 10, 0]}>
          <mesh>
            <sphereGeometry args={[1]} />
            <meshNormalMaterial />
          </mesh>
        </RigidBody>
        {balls.map(({ position }, i) => (
          <RigidBody key={i} colliders="ball" position={position}>
            <mesh castShadow>
              <sphereGeometry args={[radius]} />
              <meshStandardMaterial />
            </mesh>
          </RigidBody>
        ))}
      </Physics>
    </>
  )
}
