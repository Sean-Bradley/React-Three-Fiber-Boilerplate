import { Canvas, extend } from '@react-three/fiber'
import Polyhedron from './Polyhedron'
import {
  AxesHelper,
  BoxGeometry,
  SphereGeometry,
  DodecahedronGeometry,
  GridHelper
} from 'three'
import { useMemo } from 'react'
import { Stats, OrbitControls } from '@react-three/drei'

extend({ AxesHelper, GridHelper })

export default function App() {
  const polyhedron = useMemo(
    () => [
      new BoxGeometry(),
      new SphereGeometry(0.785398),
      new DodecahedronGeometry(0.785398)
    ],
    []
  )

  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <Polyhedron
        position={[-0.75, -0.75, 0]}
        userData-polyhedron={polyhedron}
      />
      <Polyhedron
        position={[0.75, -0.75, 0]}
        userData-polyhedron={polyhedron}
      />
      <Polyhedron
        position={[-0.75, 0.75, 0]}
        userData-polyhedron={polyhedron}
      />
      <Polyhedron
        position={[0.75, 0.75, 0]}
        userData-polyhedron={polyhedron}
      />
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
      <Stats />
    </Canvas>
  )
}
