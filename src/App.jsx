import { useRef, forwardRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'
import TWEEN from '@tweenjs/tween.js'

function Plane({ monkey }) {
  return (
    <mesh
      position-y={-1}
      rotation-x={-Math.PI / 2}
      receiveShadow
      onDoubleClick={({ point }) => {
        new TWEEN.Tween(monkey.current.position)
          .to(
            {
              x: point.x,
              z: point.z
            },
            500
          )
          .start()

        new TWEEN.Tween(monkey.current.position)
          .to(
            {
              y: point.y + 3
            },
            250
          )
          .easing(TWEEN.Easing.Cubic.Out)
          .start()
          .onComplete(() => {
            new TWEEN.Tween(monkey.current.position)
              .to(
                {
                  y: point.y + 1
                },
                250
              )
              .easing(TWEEN.Easing.Bounce.Out)
              .start()
          })
      }}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial />
    </mesh>
  )
}

const Monkey = forwardRef(function Monkey({ position }, ref) {
  const { scene } = useGLTF('/models/suzanne.glb')
  scene.children.forEach((m) => {
    m.castShadow = true
    m.material = new MeshStandardMaterial({ flatShading: true })
  })
  return (
    <group ref={ref} position={position} castShadow>
      <primitive object={scene} />
    </group>
  )
})

function Tween() {
  useFrame(() => {
    TWEEN.update()
  })
}

export default function App() {
  const ref = useRef()
  return (
    <>
      <Canvas camera={{ position: [0, 0, 3] }} shadows>
        <Environment preset="forest" />
        <directionalLight position={[1, 1, 1]} intensity={Math.PI} castShadow />
        <OrbitControls />
        <Monkey ref={ref} />
        <Plane monkey={ref} />
        <Tween />
        <Stats />
      </Canvas>
      <div id="instructions">Doubleclick anywhere on the plane to bounce the monkey to it</div>
    </>
  )
}
