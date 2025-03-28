import Polyhedron from './Polyhedron'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import Floor from './Floor'

function Lights() {
  const ambientCtl = useControls('Ambient Light', {
    visible: false,
    intensity: {
      value: 1.0,
      min: 0,
      max: 1.0,
      step: 0.1
    }
  })

  const directionalCtl = useControls('Directional Light', {
    visible: true,
    position: {
      x: 3.3,
      y: 1.0,
      z: 4.4
    },
    castShadow: true
  })

  const pointCtl = useControls('Point Light', {
    visible: false,
    position: {
      x: 2,
      y: 0,
      z: 0
    },
    castShadow: true
  })

  const spotCtl = useControls('Spot Light', {
    visible: false,
    position: {
      x: 3,
      y: 2.5,
      z: 1
    },
    castShadow: true
  })

  return (
    <>
      <ambientLight visible={ambientCtl.visible} intensity={ambientCtl.intensity} />
      <directionalLight
        visible={directionalCtl.visible}
        position={[directionalCtl.position.x, directionalCtl.position.y, directionalCtl.position.z]}
        castShadow={directionalCtl.castShadow}
      />
      <pointLight
        visible={pointCtl.visible}
        position={[pointCtl.position.x, pointCtl.position.y, pointCtl.position.z]}
        castShadow={pointCtl.castShadow}
      />
      <spotLight
        visible={spotCtl.visible}
        position={[spotCtl.position.x, spotCtl.position.y, spotCtl.position.z]}
        castShadow={spotCtl.castShadow}
      />
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
