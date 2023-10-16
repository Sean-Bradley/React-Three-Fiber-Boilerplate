import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  useProgress,
  Html
} from '@react-three/drei'
import { Model } from './Scan'
import { Suspense, useRef } from 'react'
import TWEEN from '@tweenjs/tween.js'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function Tween() {
  useFrame(() => {
    TWEEN.update()
  })
}

export default function App() {
  const ref = useRef()
  return (
    <>
      <Canvas shadows camera={{ position: [4, 0, 3] }}>
        <Suspense fallback={<Loader />}>
          <Environment preset="forest" />
          <OrbitControls ref={ref} target={[4, 0, 0]} />
          <Model controls={ref} />
          <Tween />
        </Suspense>
      </Canvas>
      <div id="instructions">Doubleclick to change OrbitControls target</div>
    </>
  )
}
