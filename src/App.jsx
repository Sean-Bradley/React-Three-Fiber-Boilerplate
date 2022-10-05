import { Canvas } from '@react-three/fiber'
import Polyhedron from './Polyhedron'
import * as THREE from 'three'
import { useMemo } from 'react'
import { Stats, OrbitControls } from '@react-three/drei'
import { Leva, useControls } from 'leva'

export default function App() {
  const polyhedron = useMemo(
    () => [
      new THREE.BoxGeometry(),
      new THREE.SphereGeometry(0.785398),
      new THREE.DodecahedronGeometry(0.785398)
    ],
    []
  )

  const pA = useControls('Polygon A', {
    x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 }
  })
  const pB = useControls('Polygon B', {
    x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 }
  })

  return (
    <>
      <Canvas camera={{ position: [1, 2, 3] }}>
        <Polyhedron
          position={[-1, 1, 0]}
          rotation={[pA.x, pA.y, pA.z]}
          userData-polyhedron={polyhedron}
        />
        <Polyhedron
          position={[1, 1, 0]}
          rotation={[pB.x, pB.y, pB.z]}
          userData-polyhedron={polyhedron}
        />
        <OrbitControls />
        <axesHelper args={[5]} />
        <gridHelper />
        <Stats />
      </Canvas>
      <Leva />
    </>
  )
}
