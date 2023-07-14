import { Canvas } from '@react-three/fiber'
import { Stats, Environment } from '@react-three/drei'
import Game from './Game'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import Instructions from './Instructions'

function Loader() {
  //const { progress } = useProgress()
  //return <Html center>{progress} % loaded</Html>
  return <div>loading...</div>
}

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Canvas shadows>
          <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
          <Physics>
            <Game />
          </Physics>
          <Stats />
        </Canvas>
        <Instructions />
      </Suspense>
    </>
  )
}
