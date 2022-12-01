import { useGLTF } from '@react-three/drei'
import useOctree from './useOctree'
// import Player from './Player'
import useOctreeHelper from './useOctreeHelper'
import { useRef, useMemo } from 'react'
import SphereCollider from './SphereCollider'
import { Vector3 } from 'three'
import Ball from './Ball'
import { Physics, useSphere, useTrimesh } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import useKeyboard from './useKeyboard'

const ballCount = 100
const radius = 0.2
const balls = [...Array(ballCount)].map(() => ({ position: [Math.random() * 50 - 25, 20, Math.random() * 50 - 25] }))
const v1 = new Vector3()
const v2 = new Vector3()
const v3 = new Vector3()

export default function Game({ clicked }) {
  const ref = useRef()
  const { nodes } = useGLTF('./models/scene-transformed.glb')
  const {
    attributes: {
      position: { array: vertices },
    },
    index: { array: indices },
  } = nodes.Suzanne007.geometry
  const [triRef] = useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
    }),
    useRef(null),
  )

  //const playerOnFloor = useRef(false)
  const playerPosition = useMemo(() => new Vector3(0, 2, 0), [])
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
    const speedDelta = delta * 8 //(playerOnFloor ? 25 : 8)
    keyboard['KeyA'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(-speedDelta))
    keyboard['KeyD'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyW'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyS'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta))
    //if (playerOnFloor) {
    if (keyboard['Space']) {
      playerVelocity.y = 3
    }
    //}
  }

  useFrame(({ camera }, delta) => {
    controls(camera, delta, playerVelocity, playerDirection)
    // ref.current?.setTranslation({ x: 0, y: 0, z: -3 })
    // ref.current?.setLinvel({ x: 0, y: 0, z: 3 })

    let damping = Math.exp(-4 * delta) - 1
    playerVelocity.addScaledVector(playerVelocity, damping)
    //const deltaPosition = playerVelocity.clone().multiplyScalar(delta)

    //playerPosition.add(deltaPosition)
    //capsule.translate(deltaPosition)
    //console.log(ref.current)
    //ref.current.translation().set(playerPosition)
    ref.current.applyImpulse(playerVelocity)
    camera.position.copy(ref.current.translation())
  })

  return (
    <>
      <Physics shouldInvalidate={false}>
        <mesh ref="triRef" mass={1} castShadow receiveShadow geometry={nodes.Suzanne007.geometry} material={nodes.Suzanne007.material} position={[1.74, 1.04, 24.97]} />
        {/* <mesh mass={1} position={[0, 10, 0]}>
          <sphereGeometry args={[1]} />
          <meshNormalMaterial />
        </mesh>
        {balls.map(({ position }, i) => (
          <mesh castShadow key={i} position={position}>
            <sphereGeometry args={[radius]} />
            <meshStandardMaterial />
          </mesh>
        ))} */}
      </Physics>
    </>
  )
}
