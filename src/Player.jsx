import { useMemo, useRef } from 'react'
import { Vector3, Euler, Quaternion, Matrix4, AnimationMixer } from 'three'
import Eve from './Eve'
import { useCompoundBody } from '@react-three/cannon'
import useKeyboard from './useKeyboard'
import { useFrame } from '@react-three/fiber'
import { Vec3 } from 'cannon-es'
import useFollowCam from './useFollowCam'

export default function Player({ position }) {
  const { pivot } = useFollowCam()
  //const onTheGround = useRef(true)
  const playerGrounded = useRef(false)
  const inJumpAction = useRef(false)
  const group = useRef()
  const velocity = useMemo(() => new Vector3(), [])
  const inputVelocity = useMemo(() => new Vector3(), [])
  const euler = useMemo(() => new Euler(), [])
  const quat = useMemo(() => new Quaternion(), [])
  const targetQuaternion = useMemo(() => new Quaternion(), [])
  const worldPosition = useMemo(() => new Vector3(), [])
  const contactNormal = useMemo(() => new Vec3(0, 0, 0), [])
  const down = useMemo(() => new Vec3(0, -1, 0), [])

  const prevActiveAction = useRef(0) // 0:idle, 1:walking, 2:jumping

  const mixer = useMemo(() => new AnimationMixer(), [])
  const actions = useRef({})

  const keyboard = useKeyboard()

  const [ref, body] = useCompoundBody(
    () => ({
      mass: 1,
      shapes: [
        { args: [0.25], position: [0, 0.25, 0], type: 'Sphere' },
        { args: [0.25], position: [0, 0.75, 0], type: 'Sphere' },
        { args: [0.25], position: [0, 1.25, 0], type: 'Sphere' }
      ],
      onCollide: (e) => {
        if (e.contact.bi.id !== e.body.id) {
          contactNormal.set(...e.contact.ni)
        }
        if (contactNormal.dot(down) > 0.5) {
          if (inJumpAction.current) {
            //console.log('landed')
            inJumpAction.current = false
            actions['jump'].fadeOut(0.1)
            actions['idle'].reset().fadeIn(0.1).play()
          }
        }
      },
      material: 'slippery',
      linearDamping: 1.0,
      position: position
    }),
    useRef()
  )

  useFrame(({ scene, raycaster }, delta) => {
    let activeAction = 0 // 0:idle, 1:walking, 2:jumping
    body.angularFactor.set(0, 0, 0)

    ref.current.getWorldPosition(worldPosition)

    playerGrounded.current = false
    const offset = worldPosition.clone()
    offset.y += 0.01
    raycaster.set(offset, down)
    raycaster.intersectObjects(scene.children, false).forEach((i) => {
      if (i.distance < 0.011) {
        playerGrounded.current = true
      }
    })
    if (!playerGrounded.current) {
      //console.log('in air')
      body.linearDamping.set(0)
    } else {
      body.linearDamping.set(0.9999999)
    }

    const distance = worldPosition.distanceTo(group.current.position)

    const rotationMatrix = new Matrix4()
    rotationMatrix.lookAt(worldPosition, group.current.position, group.current.up)
    targetQuaternion.setFromRotationMatrix(rotationMatrix)
    if (distance > 0.0001 && !group.current.quaternion.equals(targetQuaternion)) {
      targetQuaternion.z = 0
      targetQuaternion.x = 0
      targetQuaternion.normalize()
      group.current.quaternion.rotateTowards(targetQuaternion, delta * 20)
    }
    if (document.pointerLockElement) {
      inputVelocity.set(0, 0, 0)
      if (playerGrounded.current) {
        // if grounded I can walk
        activeAction = 0
        if (keyboard['KeyW']) {
          activeAction = 1
          inputVelocity.z = -40 * delta
        }
        if (keyboard['KeyS']) {
          activeAction = 1
          inputVelocity.z = 40 * delta
        }
        if (keyboard['KeyA']) {
          activeAction = 1
          inputVelocity.x = -40 * delta
        }
        if (keyboard['KeyD']) {
          activeAction = 1
          inputVelocity.x = 40 * delta
        }
      }
      //console.log(inputVelocity.x)
      // inputVelocity.x = Math.min(Math.max(inputVelocity.x, -0.5), 0.5)
      // inputVelocity.z = Math.min(Math.max(inputVelocity.z, -0.5), 0.5)

      inputVelocity.setLength(.7)

      if (keyboard['Space']) {
        activeAction = 2
        if (playerGrounded.current && !inJumpAction.current) {
          //playerGrounded.current = false
          inputVelocity.y = 7
        }
      }

      if (activeAction !== prevActiveAction.current) {
        //console.log('active action changed')
        if (prevActiveAction.current === 0 && activeAction === 1) {
          //console.log('idle --> walking')
          actions['idle'].fadeOut(0.1)
          actions['walk'].reset().fadeIn(0.1).play()
        }
        if (prevActiveAction.current === 1 && activeAction === 0) {
          //console.log('walking --> idle')
          actions['walk'].fadeOut(0.1)
          actions['idle'].reset().fadeIn(0.1).play()
        }
        if (prevActiveAction.current !== 2 && activeAction === 2) {
          //console.log('jumping')
          inJumpAction.current = true
          actions['walk'].fadeOut(0.5)
          actions['idle'].fadeOut(0.5)
          actions['jump'].reset().fadeIn(0.5).play()
        }
        prevActiveAction.current = activeAction
      }

      euler.y = pivot.rotation.y
      euler.order = 'YZX'
      quat.setFromEuler(euler)
      inputVelocity.applyQuaternion(quat)
      velocity.set(inputVelocity.x, inputVelocity.y, inputVelocity.z)

      body.applyImpulse([velocity.x, velocity.y, velocity.z], [0, 0, 0])
    }

    if (activeAction === 1) {
      mixer.update(delta * distance * 22.5)
    } else {
      mixer.update(delta)
    }

    if (worldPosition.y < -3) {
      //console.log('reset')
      body.velocity.set(0, 0, 0)
      body.position.set(0, 1, 0)
      group.current.position.set(0, 1, 0)
    }

    group.current.position.lerp(worldPosition, 0.3)

    pivot.position.lerp(worldPosition, 0.1)
  })

  return (
    <>
      <group ref={group} position={position}>
        <Eve mixer={mixer} actions={actions} />
      </group>
    </>
  )
}
