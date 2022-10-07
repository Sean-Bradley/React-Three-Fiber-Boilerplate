import { Canvas } from '@react-three/fiber'
import Polyhedron from './Polyhedron'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { useRef } from 'react'

export default function App() {
  const ambientRef = useRef()
  const directionalRef = useRef()
  const pointRef = useRef()
  const spotRef = useRef()

  useControls('Ambient Light', {
    visible: {
      value: false,
      onChange: (v) => {
        if (ambientRef.current) ambientRef.current.visible = v
      }
    },
    color: {
      value: 'white',
      onChange: (v) => {
        if (ambientRef.current) ambientRef.current.color = new THREE.Color(v)
      }
    }
  })

  useControls('Directional Light', {
    visible: {
      value: true,
      onChange: (v) => {
        if (directionalRef.current) directionalRef.current.visible = v
      }
    },
    position: {
      x: 1,
      y: 1,
      z: 1,
      onChange: (v) => {
        if (directionalRef.current) directionalRef.current.position.copy(v)
      }
    },
    color: {
      value: 'white',
      onChange: (v) => {
        if (directionalRef.current) directionalRef.current.color = new THREE.Color(v)
      }
    }
  })

  useControls('Point Light', {
    visible: {
      value: false,
      onChange: (v) => {
        if (pointRef.current) pointRef.current.visible = v
      }
    },
    position: {
      x: 2,
      y: 0,
      z: 0,
      onChange: (v) => {
        if (pointRef.current) pointRef.current.position.copy(v)
      }
    },
    color: {
      value: 'white',
      onChange: (v) => {
        if (pointRef.current) pointRef.current.color = new THREE.Color(v)
      }
    }
  })

  useControls('Spot Light', {
    visible: {
      value: false,
      onChange: (v) => {
        if (spotRef.current) spotRef.current.visible = v
      }
    },
    position: {
      x: 3,
      y: 2.5,
      z: 1,
      onChange: (v) => {
        if (spotRef.current) spotRef.current.position.copy(v)
      }
    },
    color: {
      value: 'white',
      onChange: (v) => {
        if (spotRef.current) spotRef.current.color = new THREE.Color(v)
      }
    }
  })

  return (
    <>
      <Canvas camera={{ position: [4, 4, 1.5] }}>
        <ambientLight ref={ambientRef} visible={false} />
        <directionalLight ref={directionalRef} />
        <pointLight ref={pointRef} visible={false} position={[2, 0, 0]} />
        <spotLight ref={spotRef} visible={false} position={[3, 2.5, 1.0]} />
        <Polyhedron
          name="meshBasicMaterial"
          position={[-3, 1, 0]}
          material={new THREE.MeshBasicMaterial({ color: 'yellow', flatShading: true })}
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
          material={new THREE.MeshStandardMaterial({ color: 0xff0033, flatShading: true })}
        />
        <OrbitControls target={[2, 2, 0]} />
        <axesHelper args={[5]} />
        <gridHelper />
        <Stats />
      </Canvas>
      <Leva />
    </>
  )
}
