import { useRef, useEffect, useMemo } from 'react'
import { Capsule } from 'three/examples/jsm/math/Capsule.js'
import { Vector3, AnimationMixer, Matrix4, Quaternion } from 'three'
import { useFrame } from '@react-three/fiber'
import useKeyboard from './useKeyboard'
import useFollowCam from './useFollowCam'
import Eve from './Eve'

const GRAVITY = 9.8
const STEPS_PER_FRAME = 5

export default function Player({ octree, colliders, ballCount }) {
  const { pivot } = useFollowCam()
  const playerOnFloor = useRef(false)
  const awaitingLanding = useRef(true)
  const playerVelocity = useMemo(() => new Vector3(), [])
  const playerDirection = useMemo(() => new Vector3(), [])
  const playerBasePosition = useMemo(() => new Vector3(), [])
  const targetQuaternion = useMemo(() => new Quaternion(), [])
  const prevActiveAction = useRef(0) // 0:idle, 1:walking, 2:jumping
  const capsule = useMemo(() => new Capsule(new Vector3(0, 2, 0), new Vector3(0, 3, 0), 0.25), [])
  let clicked = 0

  const group = useRef()
  const mixer = useMemo(() => new AnimationMixer(), [])
  const actions = useRef({})

  const onPointerDown = () => {
    const { sphere, velocity } = colliders[clicked++ % ballCount]

    group.current.getWorldDirection(playerDirection)

    sphere.center.copy(capsule.end).addScaledVector(playerDirection, capsule.radius * 1.5)

    velocity.copy(playerDirection).multiplyScalar(10)
    velocity.addScaledVector(playerVelocity, 2)
  }

  useEffect(() => {
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
    }
  })

  useEffect(() => {
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
    const speedDelta = delta * (playerOnFloor ? 12 : 4)
    keyboard['KeyA'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(-speedDelta))
    keyboard['KeyD'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyW'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyS'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta))
    if (playerOnFloor) {
      if (keyboard['Space']) {
        playerVelocity.y = 5 
      }
    }
  }

  function updatePlayer(delta, octree, capsule, playerVelocity, playerOnFloor) {
    let damping = Math.exp(-4 * delta) - 1
    if (!playerOnFloor) {
      playerVelocity.y -= GRAVITY * delta
      damping *= 0.1 // small air resistance
    }
    playerVelocity.addScaledVector(playerVelocity, damping)
    const deltaPosition = playerVelocity.clone().multiplyScalar(delta)
    capsule.translate(deltaPosition)
    playerOnFloor = playerCollisions(capsule, octree, playerVelocity)
    //camera.position.copy(capsule.end)
    return playerOnFloor
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

    if (awaitingLanding.current && playerOnFloor) {
      console.log('just landed')
      awaitingLanding.current = false 
      actions['jump'].fadeOut(0.5)
      actions['idle'].reset().fadeIn(0.5).play()
    }
    return playerOnFloor
  }

  function teleportPlayerIfOob(capsule, playerVelocity) {
    if (capsule.end.y <= -10) {
      playerVelocity.set(0, 0, 0)
      capsule.start.set(0, 4, 0)
      capsule.end.set(0, 5, 0)
    }
  }

  useFrame(({ camera }, delta) => {
    if (document.pointerLockElement) {
      controls(camera, delta, playerVelocity, playerOnFloor.current, playerDirection)
    }
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      playerOnFloor.current = updatePlayer(deltaSteps, octree, capsule, playerVelocity, playerOnFloor.current)
    }
    teleportPlayerIfOob(capsule, playerVelocity)

    const distance = playerBasePosition.distanceTo(group.current.position)
    const rotationMatrix = new Matrix4()
    rotationMatrix.lookAt(playerBasePosition, group.current.position, group.current.up)
    targetQuaternion.setFromRotationMatrix(rotationMatrix)
    if (distance > 0.001 && !group.current.quaternion.equals(targetQuaternion)) {
      targetQuaternion.z = 0
      targetQuaternion.x = 0
      targetQuaternion.normalize()
      group.current.quaternion.rotateTowards(targetQuaternion, delta * 10)
    }

    playerBasePosition.copy(capsule.start)
    playerBasePosition.y -= 0.25

    group.current.position.lerp(playerBasePosition, 0.3)

    pivot.position.lerp(group.current.position, 0.1)

    let activeAction = 0 // 0:idle, 1:walking, 2:jumping

    if (playerOnFloor.current && (keyboard['KeyA'] || keyboard['KeyD'] || keyboard['KeyW'] || keyboard['KeyS'])) {
      activeAction = 1
    }
    if (keyboard['Space']) {
      activeAction = 2
    }

    if (activeAction !== prevActiveAction.current) {
      if (prevActiveAction.current === 0 && activeAction === 1) {
        console.log('idle --> walking')
        actions['idle'].fadeOut(0.5)
        actions['walk'].reset().fadeIn(0.1).play()
      }
      if (prevActiveAction.current === 1 && activeAction === 0) {
        console.log('walking --> idle')
        actions['walk'].fadeOut(0.5)
        actions['idle'].reset().fadeIn(0.5).play()
      }
      if (prevActiveAction.current !== 2 && activeAction === 2) {
        console.log('jumping')
        awaitingLanding.current = true
        actions['walk'].fadeOut(0.5)
        actions['idle'].fadeOut(0.5)
        actions['jump'].reset().fadeIn(0.5).play()
      }
      prevActiveAction.current = activeAction
    }

    if (activeAction === 1) {
      mixer.update(delta * distance * 20)
    } else {
      mixer.update(delta)
    }
  })

  return (
    <group ref={group}>
      <Eve mixer={mixer} actions={actions} />
    </group>
  )
}
