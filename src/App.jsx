import Polyhedron from './Polyhedron'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import Floor from './Floor'

export default function App() {
  const ambientRef = useRef()
  const directionalRef = useRef()
  const pointRef = useRef()
  const spotRef = useRef()

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
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} visible={false} />
      <directionalLight ref={directionalRef} castShadow={true} />
      <pointLight ref={pointRef} visible={false} castShadow={true} />
      <spotLight ref={spotRef} visible={false} position={[3, 2.5, 1.0]} castShadow={true} />
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
    </>
  )
}
