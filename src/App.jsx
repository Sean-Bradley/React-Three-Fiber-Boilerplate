import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import Game from './Game'
import { Physics } from '@react-three/cannon'

export default function App() {
  return (
    <>
      <Canvas shadows onPointerDown={(e) => e.target.requestPointerLock()}>
        <spotLight position={[2.5, 5, 5]} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} />
        <spotLight position={[-2.5, 5, 5]} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} />
        <Physics>
          <Game />
        </Physics>
        <gridHelper />
        <Stats />
      </Canvas>
      <div id="instructions">
        WASD to move and SPACE to jump. Model from{' '}
        <a href="https://www.mixamo.com" target="_blank" rel="nofollow noreferrer">
          Mixamo
        </a>
      </div>
    </>
  )
}
