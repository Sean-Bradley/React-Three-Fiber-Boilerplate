import { useMemo, useRef, useEffect } from 'react'
import { Object3D, Vector3, Euler, Quaternion, Matrix4, AnimationMixer, LoopOnce, TextureLoader } from 'three'
import Eve from './Eve'
import { Debug, Physics, usePlane, useBox, useCompoundBody, useContactMaterial } from '@react-three/cannon'
import useKeyboard from './useKeyboard'
import { useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { Vec3 } from 'cannon-es'
import { useLoader } from '@react-three/fiber'

const obstacles = [...Array(50)].map((itm, i) => ({
  position: [(Math.random() - 0.5) * 25, 2 * i, (Math.random() - 0.5) * 25],
  args: [Math.random() * 20, Math.random() * 2, Math.random() * 5]
}))

function Floor({ texture, ...props }) {
  const [ref] = usePlane(() => ({ ...props }), useRef())
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

function PlayerCollider({ followCamPivot, ...props }) {
  const canJump = useRef(false)
  const group = useRef()
  const velocity = useMemo(() => new Vector3(), [])
  const inputVelocity = useMemo(() => new Vector3(), [])
  const euler = useMemo(() => new Euler(), [])
  const quat = useMemo(() => new Quaternion(), [])
  const targetQuaternion = useMemo(() => new Quaternion(), [])
  const worldPosition = useMemo(() => new Vector3(), [])
  //const rotationMatrix = useMemo(() => new Matrix4(), [])
  const contactNormal = useMemo(() => new Vec3(0, 0, 0), [])
  const upAxis = useMemo(() => new Vec3(0, -1, 0), [])

  const mixer = useMemo(() => new AnimationMixer(), [])
  const actions = {}

  const keyboard = useKeyboard()

  useEffect(() => {
    ref.current.add(followCamPivot)
  })

  const [ref, body] = useCompoundBody(
    () => ({
      mass: 1,
      shapes: [
        { args: [0.5], position: [0, 0.5, 0], type: 'Sphere' },
        { args: [0.5], position: [0, 1.5, 0], type: 'Sphere' }
      ],
      onCollide: (e) => {
        //const contact = e.contact
        //console.log(e.contact.ni)
        // if (e.contact.bi.id === e.body.id) {
        //   e.contact.ni.negate(contactNormal)
        // } else {
        //   contactNormal.set(...e.contact.ni)
        // }
        //console.log(canJump.current)
        // console.log(contactNormal.dot(upAxis))
        // if (contactNormal.dot(upAxis) > 0.5) {
        if (!canJump.current) {
          console.log('landed')
          body.linearDamping.set(0.95)
          actions['jump'].fadeOut(0.1)
          actions['walk'].reset().fadeIn(0.1).play()

          canJump.current = true
        }

        //}
      },
      ...props
    }),
    useRef()
  )

  useFrame((_, delta) => {
    //console.log(body)
    body.angularFactor.set(0, 0, 0)

    ref.current.getWorldPosition(worldPosition)
    const p = new Vector3().copy(worldPosition)
    p.y -= 1
    const distance = worldPosition.distanceTo(group.current.position)

    if (canJump.current) {
      //walking
      mixer.update(delta * distance * 5)
    } else {
      //were in the air
      mixer.update(delta)
    }

    //console.log(distance)

    const rotationMatrix = new Matrix4()
    rotationMatrix.lookAt(worldPosition, group.current.position, group.current.up)
    targetQuaternion.setFromRotationMatrix(rotationMatrix)
    if (!group.current.quaternion.equals(targetQuaternion)) {
      //   //   //console.log(p)
      targetQuaternion.z = 0
      targetQuaternion.x = 0
      targetQuaternion.normalize()
      group.current.quaternion.rotateTowards(targetQuaternion, delta * 10)
    }
    if (canJump.current) {
      inputVelocity.set(0, 0, 0)
      if (keyboard['KeyW']) {
        inputVelocity.z = -10 * delta
      }
      if (keyboard['KeyS']) {
        inputVelocity.z = 10 * delta
      }
      if (keyboard['KeyA']) {
        inputVelocity.x = -10 * delta
      }
      if (keyboard['KeyD']) {
        inputVelocity.x = 10 * delta
      }
      if (keyboard['Space']) {
        if (canJump.current) {
          inputVelocity.y = 6.5
          body.linearDamping.set(0.5)
          actions['walk'].fadeOut(0.1).stop()
          actions['jump'].reset().fadeIn(0.1).play()
          actions['jump'].loop = LoopOnce
        }
        canJump.current = false
      }
      euler.y = followCamPivot.rotation.y
      euler.order = 'XYZ'
      quat.setFromEuler(euler)
      inputVelocity.applyQuaternion(quat)
      velocity.set(inputVelocity.x, inputVelocity.y, inputVelocity.z)

      body.applyImpulse([velocity.x, velocity.y, velocity.z], [0, 0, 0])
    }
    group.current.position.lerp(worldPosition, 0.1)
  })

  return (
    <>
      <group ref={group}>
        <Eve mixer={mixer} actions={actions} />
      </group>
    </>
  )
}

function Obstacle({ args, position, ...props }) {
  const [ref] = useBox(() => ({ args: [...args], mass: 1, position: position, ...props }), useRef())

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[...args]} />
      <meshStandardMaterial />
    </mesh>
  )
}

function PhysicsContext({ followCamPivot }) {
  const texture = useLoader(TextureLoader, './img/grid.png')

  useContactMaterial('ground', 'slippery', {
    friction: 0,
    restitution: 0.3,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3
  })
  return (
    <>
      {/* <Debug> */}
      <Floor rotation={[-Math.PI / 2, 0, 0]} material={'ground'} texture={texture} />
      {obstacles.map(({ position, args }, i) => (
        <Obstacle key={i} position={position} args={args} material={'ground'}></Obstacle>
      ))}
      <PlayerCollider followCamPivot={followCamPivot} position={[0, 1, 0]} linearDamping={0.95} material={'slippery'} />
      {/* </Debug> */}
    </>
  )
}

export default function Game({ menuPanel }) {
  const ref = useRef()
  const followCamPivot = useMemo(() => {
    const o = new Object3D()
    o.rotation.order = 'YXZ'
    return o
  }, [])
  const followCam = useMemo(() => {
    const o = new Object3D()
    o.position.y = 2
    o.position.z = 2
    return o
  }, [])
  const camTo = useMemo(() => new Vector3(), [])

  useEffect(() => {
    //console.log('adding cam to pivot')
    followCamPivot.add(followCam)
  }, [followCamPivot, followCam])

  function onLock() {
    menuPanel.current.style.display = 'none'
    document.addEventListener('mousemove', onDocumentMouseMove)
  }

  function onUnlock() {
    menuPanel.current.style.display = 'block'
    document.removeEventListener('mousemove', onDocumentMouseMove)
  }

  const onDocumentMouseMove = (e) => {
    followCamPivot.rotation.y -= e.movementX * 0.002
    followCamPivot.rotation.x -= e.movementY * 0.002
    return false
  }

  useFrame(({ camera }, delta) => {
    followCam.getWorldPosition(camTo)
    camera.position.lerpVectors(camera.position, camTo, delta * 5)
  })

  return (
    <>
      <Physics>
        <PhysicsContext followCamPivot={followCamPivot} />
      </Physics>
      <PointerLockControls ref={ref} onLock={() => onLock()} onUnlock={() => onUnlock()} />
    </>
  )
}
