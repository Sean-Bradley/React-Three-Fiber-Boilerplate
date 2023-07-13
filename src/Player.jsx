import { useMemo, useRef } from 'react'
import { Vector3, Euler, Quaternion, Matrix4, AnimationMixer } from 'three'
import Eve from './Eve'
import { useCompoundBody } from '@react-three/cannon'
import useKeyboard from './useKeyboard'
import { useFrame } from '@react-three/fiber'
import { Vec3 } from 'cannon-es'
import useFollowCam from './useFollowCam'

export default function PlayerCollider() {
  const { pivot } = useFollowCam()
  const onTheGround = useRef(true)
  const group = useRef()
  const velocity = useMemo(() => new Vector3(), [])
  const inputVelocity = useMemo(() => new Vector3(), [])
  const euler = useMemo(() => new Euler(), [])
  const quat = useMemo(() => new Quaternion(), [])
  const targetQuaternion = useMemo(() => new Quaternion(), [])
  const worldPosition = useMemo(() => new Vector3(), [])
  const contactNormal = useMemo(() => new Vec3(0, 0, 0), [])
  const upAxis = useMemo(() => new Vec3(0, -1, 0), [])

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
        if (contactNormal.dot(upAxis) > 0.5) {
          console.log('onTheGround')
          if (!onTheGround.current) {
            console.log('landed')
            //     actions['jump'].fadeOut(0.1)
            //     actions['walk'].reset().fadeIn(0.1).play()
            actions['jump'].fadeOut(0.5)
            actions['idle'].reset().fadeIn(0.5).play()
            onTheGround.current = true
            //console.log(prevActiveAction.current)
          }
        }
      },
      material: 'slippery',
      linearDamping: 0.95
    }),
    useRef()
  )

  useFrame((_, delta) => {
    let activeAction = 0 // 0:idle, 1:walking, 2:jumping
    body.angularFactor.set(0, 0, 0)

    //console.log(body.velocity.get())

    ref.current.getWorldPosition(worldPosition)
    const distance = worldPosition.distanceTo(group.current.position)

    const rotationMatrix = new Matrix4()
    rotationMatrix.lookAt(worldPosition, group.current.position, group.current.up)
    targetQuaternion.setFromRotationMatrix(rotationMatrix)
    if (distance > 0.001 && !group.current.quaternion.equals(targetQuaternion)) {
      targetQuaternion.z = 0
      targetQuaternion.x = 0
      targetQuaternion.normalize()
      group.current.quaternion.rotateTowards(targetQuaternion, delta * 10)
    }
    if (document.pointerLockElement) {
      inputVelocity.set(0, 0, 0)
      if (onTheGround.current) {
        activeAction = 0
        if (keyboard['KeyW']) {
          activeAction = 1
          inputVelocity.z = -20 * delta
        }
        if (keyboard['KeyS']) {
          activeAction = 1
          inputVelocity.z = 20 * delta
        }
        if (keyboard['KeyA']) {
          activeAction = 1
          inputVelocity.x = -20 * delta
        }
        if (keyboard['KeyD']) {
          activeAction = 1
          inputVelocity.x = 20 * delta
        }
      }
      //console.log(inputVelocity.x)
      //inputVelocity.x = Math.min(Math.max(inputVelocity.x, -0.33), 0.33)
      //inputVelocity.z = Math.min(Math.max(inputVelocity.z, -0.33), 0.33)

      if (keyboard['Space']) {
        activeAction = 2
        if (onTheGround.current) {
          onTheGround.current = false
          inputVelocity.y = 8
          inputVelocity.x *= 10
          inputVelocity.z *= 10
        }
      }

      if (activeAction !== prevActiveAction.current) {
        //console.log('active action changed')
        if (prevActiveAction.current === 0 && activeAction === 1) {
          console.log('idle --> walking')
          actions['idle'].fadeOut(0.5)
          actions['walk'].reset().fadeIn(0.5).play()
        }
        if (prevActiveAction.current === 1 && activeAction === 0) {
          console.log('walking --> idle')
          actions['walk'].fadeOut(0.5)
          actions['idle'].reset().fadeIn(0.5).play()
        }
        if (prevActiveAction.current !== 2 && activeAction === 2) {
          console.log('jumping')
          actions['walk'].fadeOut(0.5)
          actions['idle'].fadeOut(0.5)
          actions['jump'].reset().fadeIn(0.5).play()
        }
        prevActiveAction.current = activeAction
      }

      // //console.log(distance)
      //if (activeAction === 1) {
      //   // walking

      // } else {
      //   // in the air, idle
      //   mixer.update(delta)
      // }

      euler.y = pivot.rotation.y
      euler.order = 'XYZ'
      quat.setFromEuler(euler)
      inputVelocity.applyQuaternion(quat)
      velocity.set(inputVelocity.x, inputVelocity.y, inputVelocity.z)

      body.applyImpulse([velocity.x, velocity.y, velocity.z], [0, 0, 0])
    }

    if (activeAction === 1) {
      mixer.update(delta * distance * 20)
    } else {
      mixer.update(delta)
    }

    if (worldPosition.y < -3) {
      console.log('reset')
      // prevActiveAction.current = 0
      // onTheGround.current = true
      body.position.set(0, 2, 0)
      group.current.position.set(0, 2, 0)
    }

    group.current.position.lerp(worldPosition, 0.3)

    pivot.position.lerp(worldPosition, 0.1)
  })

  return (
    <>
      <group ref={group}>
        <Eve mixer={mixer} actions={actions} />
      </group>
    </>
  )
}
