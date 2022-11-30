import { Canvas } from '@react-three/fiber'
import { useMemo, useState } from 'react'
import { Stats, OrbitControls, Environment } from '@react-three/drei'
import { useControls } from 'leva'
import { SphereGeometry } from 'three'

function Squircle() {
  const [segments, setSegments] = useState(32)

  let geometry = useMemo(() => {
    const g = new SphereGeometry(1, segments, segments)
    const p = g.attributes.position
    const a = p.array

    for (let i = 1; i < p.count; i++) {
      let x = a[3 * i],
        y = a[3 * i + 1],
        z = a[3 * i + 2],
        e
      do {
        e = x ** 4 + y ** 4 + z ** 4 - 1
        if (e > 0) {
          x *= 0.9999
          y *= 0.9999
          z *= 0.9999
        } else {
          x *= 1.0001
          y *= 1.0001
          z *= 1.0001
        }
      } while (Math.abs(e) > 1e-7)
      a[3 * i] = x
      a[3 * i + 1] = y
      a[3 * i + 2] = z
    }
    return g
  }, [segments])

  useControls('Squircle', {
    segments: {
      value: 32,
      min: 6,
      max: 32,
      step: 1,
      onChange: (v) => {
        setSegments(v)
      }
    }
  })

  return (
    <mesh geometry={geometry} position-y={1}>
      <meshPhysicalMaterial metalness={0} roughness={0.36} clearcoat={1} transmission={1} ior={1.53} thickness={5} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [1.6, 1.3, -2.5] }}>
      <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
      <Squircle />
      <OrbitControls target={[0, 1, 0]} autoRotate />
      <Stats />
    </Canvas>
  )
}
