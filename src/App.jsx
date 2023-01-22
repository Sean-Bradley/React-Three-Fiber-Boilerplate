import { Canvas, useFrame } from '@react-three/fiber'
import { Stats, Environment, PerspectiveCamera } from '@react-three/drei'
import Model from './Scene'
import { useRef, useState, useMemo } from 'react'
import { Vector2, Vector3 } from 'three'

function Teleport({ dragging, dragVector }) {
  const ref = useRef()
  const circleRef = useRef()
  const [lerping, setLerping] = useState(false)
  const [to, setTo] = useState(new Vector3())
  useFrame((_, delta) => {
    if (dragging) {
      ref.current.rotation.y += ((dragVector.x / 18) * Math.PI) / 180
      ref.current.children[0].rotation.x += ((dragVector.y / 18) * Math.PI) / 180
    }
    lerping && ref.current.position.lerp(to, delta * 2)
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
          const v = new Vector3(point.x, 1, point.z)
          setTo(v)
          setLerping(true)
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
  const [dragging, setDragging] = useState(false)
  const dragVector = useMemo(() => new Vector2(), [])

  return (
    <Canvas
      onPointerDown={() => {
        setDragging(true)
      }}
      onPointerUp={() => {
        setDragging(false)
      }}
      onPointerMove={(e) => {
        if (dragging) {
          dragVector.set(e.movementX, e.movementY)
        } else {
          dragVector.set(0, 0)
        }
      }}>
      <Teleport dragging={dragging} dragVector={dragVector} />
      <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
      <Model />
      <Stats />
    </Canvas>
  )
}
