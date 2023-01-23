import { Canvas } from '@react-three/fiber'
import { Stats, PointerLockControls } from '@react-three/drei'
import { useEffect, useState } from 'react'

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
      <Canvas>
        <mesh>
          <boxGeometry args={[100, 10, 100, 100, 10, 100]} />
          <meshBasicMaterial wireframe color={'lime'} />
        </mesh>
        <PointerLockControls selector="#button" />
        <Stats />
      </Canvas>
      <div id="instructions" className={showInstructions ? 'show' : 'hide'}>
        Instructions
        <br />
        <button id="button">Click To Enter</button>
      </div>
    </>
  )
}
