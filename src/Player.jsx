import { useRef, useEffect, useMemo } from 'react'
import { Capsule } from 'three/examples/jsm/math/Capsule.js'
import { Vector3 } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import useKeyboard from './useKeyboard'

const GRAVITY = 30
const STEPS_PER_FRAME = 5

export default function Player({ octree, clicked, colliders, ballCount }) {
  const playerOnFloor = useRef(false)
  const playerVelocity = useMemo(() => new Vector3(), [])
  const playerDirection = useMemo(() => new Vector3(), [])
  const capsule = useMemo(() => new Capsule(new Vector3(0, 10, 0), new Vector3(0, 11, 0), 0.5), [])
  const { camera } = useThree()

  useEffect(() => {
    clicked && throwBall(camera, capsule, playerDirection, playerVelocity, clicked)
  })

  useEffect(() => {
    console.log('adding reference to this capsule collider')
    colliders[ballCount] = { capsule: capsule, velocity: playerVelocity }
  }, [colliders, ballCount, capsule, playerVelocity])

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

  function controls(camera, delta, playerVelocity, playerOnFloor, playerDirection) {
    const speedDelta = delta * (playerOnFloor ? 25 : 8)
    keyboard['KeyA'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(-speedDelta))
    keyboard['KeyD'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyW'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyS'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta))
    if (playerOnFloor) {
      if (keyboard['Space']) {
        playerVelocity.y = 15
      }
    }
  }

  function updatePlayer(camera, delta, octree, capsule, playerVelocity, playerOnFloor) {
    let damping = Math.exp(-4 * delta) - 1
    if (!playerOnFloor) {
      playerVelocity.y -= GRAVITY * delta
      damping *= 0.1 // small air resistance
    }
    playerVelocity.addScaledVector(playerVelocity, damping)
    const deltaPosition = playerVelocity.clone().multiplyScalar(delta)
    capsule.translate(deltaPosition)
    playerOnFloor = playerCollisions(capsule, octree, playerVelocity)
    camera.position.copy(capsule.end)
    return playerOnFloor
  }

  function throwBall(camera, capsule, playerDirection, playerVelocity, count) {
    const { sphere, velocity } = colliders[count % ballCount]

    camera.getWorldDirection(playerDirection)

    sphere.center.copy(capsule.end).addScaledVector(playerDirection, capsule.radius * 1.5)

    velocity.copy(playerDirection).multiplyScalar(50)
    velocity.addScaledVector(playerVelocity, 2)
  }

  function playerCollisions(capsule, octree, playerVelocity) {
    const result = octree.capsuleIntersect(capsule)
    let playerOnFloor = false
    if (result) {
      playerOnFloor = result.normal.y > 0
      if (!playerOnFloor) {
        playerVelocity.addScaledVector(result.normal, -result.normal.dot(playerVelocity))
      }
      capsule.translate(result.normal.multiplyScalar(result.depth))
    }
    return playerOnFloor
  }

  function teleportPlayerIfOob(camera, capsule, playerVelocity) {
    if (camera.position.y <= -100) {
      playerVelocity.set(0, 0, 0)
      capsule.start.set(0, 10, 0)
      capsule.end.set(0, 11, 0)
      camera.position.copy(capsule.end)
      camera.rotation.set(0, 0, 0)
    }
  }

  useFrame(({ camera }, delta) => {
    controls(camera, delta, playerVelocity, playerOnFloor.current, playerDirection)
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      playerOnFloor.current = updatePlayer(camera, deltaSteps, octree, capsule, playerVelocity, playerOnFloor.current)
    }
    teleportPlayerIfOob(camera, capsule, playerVelocity)
  })
}
