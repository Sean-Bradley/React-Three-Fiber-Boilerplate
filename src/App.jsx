import Polyhedron from './Polyhedron'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import Floor from './Floor'
import { useLoader } from '@react-three/fiber'

function Lights() {
  const directionalRef = useRef()

  useControls('Directional Light', {
    intensity: {
      value: 1,
      min: 0,
      max: 5,
      step: 0.1,
      onChange: (v) => {
        directionalRef.current.intensity = v
      }
    },

    position: {
      x: 3.3,
      y: 1.0,
      z: 4.4,
      onChange: (v) => {
        directionalRef.current.position.copy(v)
      }
    }
  })

  return (
    <directionalLight ref={directionalRef} castShadow />
  )
}

export default function App() {
  const texture = useLoader(
    THREE.TextureLoader,
    './img/grid.png'
  )

  return (
    <Canvas camera={{ position: [4, 4, 1.5] }} shadows>
      <Lights />
      <Polyhedron
        name="meshBasicMaterial"
        position={[-3, 1, 0]}
        material={
          new THREE.MeshBasicMaterial({ map: texture })
        }
      />
      <Polyhedron
        name="meshNormalMaterial"
        position={[-1, 1, 0]}
        material={
          new THREE.MeshNormalMaterial({
            flatShading: true
          })
        }
      />
      <Polyhedron
        name="meshPhongMaterial"
        position={[1, 1, 0]}
        material={
          new THREE.MeshPhongMaterial({
            flatShading: true,
            map: texture
          })
        }
      />
      <Polyhedron
        name="meshStandardMaterial"
        position={[3, 1, 0]}
        material={
          new THREE.MeshStandardMaterial({
            flatShading: true,
            map: texture
          })
        }
      />
      <Floor />
      <OrbitControls target={[0, 1, 0]} />
      <axesHelper args={[5]} />
      <Stats />
    </Canvas>
  )
}
