import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Html, useProgress } from '@react-three/drei'
import Eve from './Eve'
import { Suspense } from 'react'

function Loader() {
  return <div className="loader"></div>
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
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0, 1, 1] }} shadows>
          <spotLight position={[2.5, 5, 5]} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} intensity={Math.PI * 50} />
          <spotLight position={[-2.5, 5, 5]} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} intensity={Math.PI * 50} />
          <Eve />
          <OrbitControls target={[0, 0.75, 0]} />
          <Stats />
        </Canvas>
      </Suspense>
    </>
  )
}
