import Polyhedron from './Polyhedron'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { useRef } from 'react'
import Floor from './Floor'

function Lights() {
  const ambientRef = useRef()
  const directionalRef = useRef()
  const pointRef = useRef()
  const spotRef = useRef()

  useControls('Ambient Light', {
    visible: {
      value: false,
      onChange: (v) => {
        ambientRef.current.visible = v
      }
    },
    intensity: {
      value: 1.0,
      min: 0,
      max: 1.0,
      step: 0.1,
      onChange: (v) => {
        ambientRef.current.intensity = v
      }
    }
  })

  useControls('Directional Light', {
    visible: {
      value: true,
      onChange: (v) => {
        directionalRef.current.visible = v
      }
    },
    position: {
      x: 3.3,
      y: 1.0,
      z: 4.4,
      onChange: (v) => {
        directionalRef.current.position.copy(v)
      }
    },
    castShadow: {
      value: true,
      onChange: (v) => {
        directionalRef.current.castShadow = v
      }
    }
  })

  useControls('Point Light', {
    visible: {
      value: false,
      onChange: (v) => {
        pointRef.current.visible = v
      }
    },
    position: {
      x: 2,
      y: 0,
      z: 0,
      onChange: (v) => {
        pointRef.current.position.copy(v)
      }
    },
    castShadow: {
      value: true,
      onChange: (v) => {
        pointRef.current.castShadow = v
      }
    }
  })

  useControls('Spot Light', {
    visible: {
      value: false,
      onChange: (v) => {
        spotRef.current.visible = v
      }
    },
    position: {
      x: 3,
      y: 2.5,
      z: 1,
      onChange: (v) => {
        spotRef.current.position.copy(v)
      }
    },
    castShadow: {
      value: true,
      onChange: (v) => {
        spotRef.current.castShadow = v
      }
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} />
      <directionalLight ref={directionalRef} />
      <pointLight ref={pointRef} />
      <spotLight ref={spotRef} />
    </>
  )
}
export default function App() {
  return (
    <>
      <Canvas camera={{ position: [4, 4, 1.5] }} shadows>
        <Lights />
        <Polyhedron
          name="meshBasicMaterial"
          position={[-3, 1, 0]}
          material={new THREE.MeshBasicMaterial({ color: 'yellow' })}
        />
        <Polyhedron
          name="meshNormalMaterial"
          position={[-1, 1, 0]}
          material={new THREE.MeshNormalMaterial({ flatShading: true })}
        />
        <Polyhedron
          name="meshPhongMaterial"
          position={[1, 1, 0]}
          material={new THREE.MeshPhongMaterial({ color: 'lime', flatShading: true })}
        />
        <Polyhedron
          name="meshStandardMaterial"
          position={[3, 1, 0]}
          material={
            new THREE.MeshStandardMaterial({
              color: 0xff0033,
              flatShading: true
            })
          }
        />
        <Floor />
        <OrbitControls target={[2, 2, 0]} />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
      <Leva />
    </>
  )
}
