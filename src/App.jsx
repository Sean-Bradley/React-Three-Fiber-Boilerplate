import { Canvas } from '@react-three/fiber'
import { Stats, useProgress, Html, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Player from './Player'
import { create } from 'zustand'
import { AnimationMixer } from 'three'

export const useStore = create(() => ({
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
      <div id="instructions">
        <kbd>w</kbd> to walk
        <br />
        <kbd>w</kbd> & <kbd>left shift</kbd> to run.
        <br />
        <kbd>space</kbd> to jump
        <br />
        <kbd>q</kbd> to fancy pose
        <br />
        <br />
        Model from{' '}
        <a href="https://www.mixamo.com" target="_blank" rel="nofollow noreferrer">
          Mixamo
        </a>
      </div>
      <Canvas camera={{ position: [0, 1, 1] }} shadows>
        <Suspense fallback={<Loader />}>
          <spotLight position={[2.5, 5, 5]} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} intensity={Math.PI * 50} />
          <spotLight position={[-2.5, 5, 5]} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} intensity={Math.PI * 50} />
          <Player />
          <OrbitControls target={[0, 0.75, 0]} />
          <Stats />
        </Suspense>
      </Canvas>
    </>
  )
}
