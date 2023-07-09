import { Canvas } from '@react-three/fiber'
import { Stats, Environment } from '@react-three/drei'
import Game from './Game'
import { Physics } from '@react-three/cannon'
import { Suspense, useEffect, useState } from 'react'

function Loader() {
  //const { progress } = useProgress()
  //return <Html center>{progress} % loaded</Html>
  return <div>loading...</div>
}

export default function App() {
  const [showInstructions, setShowInstructions] = useState(true)

  function pointerlockchange() {
    setShowInstructions(!showInstructions)
  }

  useEffect(() => {
    document.addEventListener('pointerlockchange', pointerlockchange, false)
    return () => {
      document.removeEventListener('pointerlockchange', pointerlockchange, false)
    }
  })

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
        <div id="instructions" className={showInstructions ? 'show' : 'hide'}>
          WASD to move
          <br />
          SPACE to jump.
          <br />
          Model from{' '}
          <a href="https://www.mixamo.com" target="_blank" rel="nofollow noreferrer">
            Mixamo
          </a>
          <br />
          <button
            id="button"
            onClick={(e) => {
              e.target.requestPointerLock()
              e.target.blur()
            }}>
            Click To Enter
          </button>
        </div>
      </Suspense>
    </>
  )
}
