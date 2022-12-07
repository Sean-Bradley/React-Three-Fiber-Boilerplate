import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import Game from './Game'
import { useRef } from 'react'

export default function App() {
  const menuPanel = useRef()

  return (
    <>
      <Canvas camera={{ position: [0, 1.4, 2.0] }}>
        <spotLight position={[2.5, 5, 5]} angle={Math.PI / 2} penumbra={0.5} castShadow />
        <spotLight position={[-2.5, 5, 5]} angle={Math.PI / 2} penumbra={0.5} castShadow />
        <Game menuPanel={menuPanel} />
        <gridHelper />
        <Stats />
      </Canvas>
      <div ref={menuPanel} id="menuPanel">
        <div className="centered">Click Screen to Start</div>
      </div>
      <div id="instructions">
        WASD to move and SPACE to jump. Model from{' '}
        <a href="https://www.mixamo.com" target="_blank" rel="nofollow noreferrer">
          Mixamo
        </a>
      </div>
    </>
  )
}
