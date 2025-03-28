import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  useProgress,
  Html
} from '@react-three/drei'
import { Model } from './Scan'
import { Suspense, useRef } from 'react'
import JEASINGS from 'jeasings'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
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
      <Canvas shadows camera={{ position: [4, 0, 3] }}>
        <Suspense fallback={<Loader />}>
          <Environment preset="forest" />
          <OrbitControls ref={ref} target={[4, 0, 0]} />
          <Model controls={ref} />
          <JEasings />
        </Suspense>
      </Canvas>
      <div id="instructions">Doubleclick to change OrbitControls target</div>
    </>
  )
}
