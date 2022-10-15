import { Canvas } from '@react-three/fiber'
import Polyhedron from './Polyhedron'
import * as THREE from 'three'
import { Stats } from '@react-three/drei'

export default function App() {
  const polyhedron = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.785398),
    new THREE.DodecahedronGeometry(0.785398)
  ]

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
      <Stats />
    </Canvas>
  )
}
