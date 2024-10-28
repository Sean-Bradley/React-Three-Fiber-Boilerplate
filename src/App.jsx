import { useRef, forwardRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'
import JEASINGS, { JEasing } from 'jeasings'

function Plane({ controls }) {
  return (
    <mesh
      position-y={-1}
      rotation-x={-Math.PI / 2}
      receiveShadow
      onDoubleClick={({ point }) => {
        new JEasing(controls.current.target)
          .to(
            {
              x: point.x,
              y: point.y,
              z: point.z
            },
            500
          )
          .easing(JEASINGS.Cubic.Out)
          .start()
      }}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial />
    </mesh>
  )
}

function Monkey({ position, controls }) {
  const { scene } = useGLTF('/models/suzanne.glb')
  scene.children.forEach((m) => {
    m.castShadow = true
    m.material = new MeshStandardMaterial({ flatShading: true })
  })
  return (
    <group
      position={position}
      onDoubleClick={({ point }) => {
        new JEasing(controls.current.target)
          .to(
            {
              x: point.x,
              y: point.y,
              z: point.z
            },
            500
          )
          .easing(JEASINGS.Cubic.Out)
          .start()
      }}>
      <primitive object={scene} />
    </group>
  )
}

function JEasings() {
  useFrame(() => {
    JEASINGS.update()
  })
}

export default function App() {
  const ref = useRef()
  return (
    <>
      <Canvas camera={{ position: [0, 0, 3] }} shadows>
        <Environment preset="forest" />
        <directionalLight position={[1, 1, 1]} intensity={Math.PI * 2} castShadow />
        <OrbitControls ref={ref} />
        <Plane controls={ref} />
        <Monkey controls={ref} />
        <JEasings />
        <Stats />
      </Canvas>
      <div id="instructions">Doubleclick anywhere on the monkey or plane to animate the OrbitControls target</div>
    </>
  )
}
