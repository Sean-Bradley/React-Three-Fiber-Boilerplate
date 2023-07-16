import { Canvas } from '@react-three/fiber'
import { Stats, Environment, useProgress, Html } from '@react-three/drei'
import Game from './Game'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import Instructions from './Instructions'
import { create } from 'zustand'
import { AnimationMixer } from 'three'
import { Leva } from 'leva'

export const useStore = create((set) => ({
  groundObjects: {},
  actions: {},
  mixer: new AnimationMixer(),
  gameStarted: false,
  setGameStarted: (v) => set({ gameStarted: v }),
  time: 0,
  setTime: (v) => set({ time: v }),
  finished: false,
  setFinished: (v) => set({ finished: v })
}))

function Loader() {
  const { progress, item, loaded, total } = useProgress()
  console.log(progress, item, loaded, total)
  document.getElementById('instructions').style.display = 'block'
  return (
    <Html center>
      <div id="progress">{Math.floor(progress)} % loaded</div>
    </Html>
  )
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
      <Leva collapsed />
    </>
  )
}
