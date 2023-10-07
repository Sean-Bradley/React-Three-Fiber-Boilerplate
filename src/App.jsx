import { Canvas } from '@react-three/fiber'
import { Stats, useProgress, Html } from '@react-three/drei'
import Game from './Game'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import { create } from 'zustand'
import { AnimationMixer } from 'three'

export const useStore = create(() => ({
  groundObjects: {},
  actions: {},
  mixer: new AnimationMixer()
}))

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

export default function App() {
  return (
    <>
      <Canvas shadows onPointerDown={(e) => e.target.requestPointerLock()}>
        <Suspense fallback={<Loader />}>
          <spotLight position={[2.5, 5, 5]} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} intensity={Math.PI * 25} />
          <spotLight position={[-2.5, 5, 5]} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} intensity={Math.PI * 25} />
          <Physics>
            <Game />
          </Physics>
          <gridHelper />
          <Stats />
        </Suspense>
      </Canvas>
      <div id="instructions">
        WASD to move
        <br />
        SPACE to jump.
        <br />
        Model from{' '}
        <a href="https://www.mixamo.com" target="_blank" rel="nofollow noreferrer">
          Mixamo
        </a>
      </div>
    </>
  )
}
