import { Canvas } from '@react-three/fiber'
import { Stats, Environment, useProgress, Html } from '@react-three/drei'
import Game from './Game'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import Instructions from './Instructions'
import { create } from 'zustand'
import { AnimationMixer } from 'three'

export const useStore = create((set) => ({
  groundObjects: [],
  actions: {},
  mixer: new AnimationMixer(),
  gameStarted: false,
  setGameStarted: (v) => set({ gameStarted: v })
}))

function Loader() {
  const { progress } = useProgress()
  //console.log('progress', progress)
  return <Html center>{progress} % loaded</Html>
}

export default function App() {
  return (
    <>
      <Canvas shadows>
        <Suspense fallback={<Loader />}>
          <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
          <Physics>
            <Game />
          </Physics>
          <Stats />
        </Suspense>
      </Canvas>
      <Instructions />
    </>
  )
}
