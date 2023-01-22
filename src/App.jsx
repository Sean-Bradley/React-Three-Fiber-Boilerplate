import { Canvas, useFrame } from '@react-three/fiber'
import { Stats, Environment, PerspectiveCamera } from '@react-three/drei'
import Model from './Scene'
import { useRef, useState, useMemo } from 'react'
import { Vector2, Vector3 } from 'three'
import { useEffect } from 'react'

function Teleport() {
  const ref = useRef()
  const circleRef = useRef()
  const to = useMemo(() => new Vector3(0, 1, 10), [])
  const [dragging, setDragging] = useState(false)
  const dragVector = useMemo(() => new Vector2(), [])

  useEffect(() => {
    const onPointerDown = () => {
      setDragging(true)
    }
    const onPointerUp = () => {
      setDragging(false)
    }
    const onPointerMove = (e) => {
      dragVector.set(e.movementX, e.movementY)
      dragging &&
        (ref.current.rotation.y += ((dragVector.x / 10) * Math.PI) / 180) &&
        (ref.current.children[0].rotation.x += ((dragVector.y / 10) * Math.PI) / 180)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('pointerup', onPointerUp)
    document.addEventListener('pointermove', onPointerMove)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('pointermove', onPointerMove)
    }
  })
  useFrame((_, delta) => {
    ref.current.position.lerp(to, delta * 5)
  })

  return (
    <>
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, 0, 0]}
        onPointerMove={({ point }) => {
          circleRef.current.position.z = point.z
          circleRef.current.position.x = point.x
        }}
        onDoubleClick={({ point }) => {
          to.set(point.x, 1, point.z)
        }}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial wireframe={true} color={0x00ff00} />
      </mesh>
      <mesh ref={circleRef} rotation-x={-Math.PI / 2} position-y={0.01}>
        <circleGeometry args={[0.2]} />
        <meshBasicMaterial color={'green'} />
      </mesh>
      <object3D ref={ref} position={[0, 1, 10]}>
        <PerspectiveCamera makeDefault />
      </object3D>
    </>
  )
}

export default function App() {
  return (
    <Canvas>
      <Teleport />
      <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
      <Model />
      <Stats />
    </Canvas>
  )
}
