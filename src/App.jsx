import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import useKeyboard from './useKeyboard'
import { Vector3, Quaternion } from 'three'

function Ball({ floor }) {
  console.log('creating ball')
  const ref = useRef()
  const keyMap = useKeyboard()

  const v0 = useMemo(() => new Vector3(), [])
  const q = useMemo(() => new Quaternion(), [])
  const angularVelocity = useMemo(() => new Vector3(), [])

  useFrame((_, delta) => {
    keyMap['KeyW'] && (angularVelocity.x -= delta * 5)
    keyMap['KeyS'] && (angularVelocity.x += delta * 5)
    keyMap['KeyA'] && (angularVelocity.z += delta * 5)
    keyMap['KeyD'] && (angularVelocity.z -= delta * 5)

    q.setFromAxisAngle(angularVelocity, delta).normalize()
    ref.current.applyQuaternion(q)

    angularVelocity.lerp(v0, 0.01) // slow down the roll

    floor.current.position.x += angularVelocity.z * delta
    floor.current.position.z -= angularVelocity.x * delta

    floor.current.position.x = floor.current.position.x % 10
    floor.current.position.z = floor.current.position.z % 10
  })

  return (
    <mesh ref={ref} position-y={1.0}>
      <sphereGeometry />
      <meshNormalMaterial wireframe />
    </mesh>
  )
}

export default function App() {
  const ref = useRef()
  return (
    <Canvas
      camera={{ position: [0, 2.5, 2.5] }}
      onCreated={({ camera }) => camera.lookAt(0, 1, 0)}>
      <gridHelper ref={ref} args={[100, 100]} />
      <Ball floor={ref} />
      <Stats />
    </Canvas>
  )
}
