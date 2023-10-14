import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useProgress,
  Html
} from '@react-three/drei'
import { Model } from './Scan'
import { Suspense, useRef } from 'react'
import { create } from 'zustand'
import { Vector3 } from 'three'

export const useStore = create((set) => ({
  target: new Vector3(),
  lerping: false,
  setLerping: (v) => set({ lerping: v })
}))

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function TargetCamera() {
  const ref = useRef()
  const { target, lerping } = useStore((state) => state)

  useFrame((_, delta) => {
    lerping && ref.current.target.lerp(target, delta * 10)
  })
  return <OrbitControls ref={ref} target={[4, 0, 0]} />
}

export default function App() {
  const { setLerping } = useStore((state) => state)

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [4, 0, 3] }}
        onPointerDown={() => setLerping(false)}>
        <Suspense fallback={<Loader />}>
          <Environment preset="forest" />
          <Model />
          <ContactShadows position={[0, -0.8, 0]} color="#ffffff" />
          <TargetCamera />
        </Suspense>
      </Canvas>
      <div id="instructions">Doubleclick to change OrbitControls target</div>
    </>
  )
}
