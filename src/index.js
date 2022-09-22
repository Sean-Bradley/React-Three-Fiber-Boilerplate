import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={0x00ff00} wireframe={true} />
      </mesh>
    </Canvas>
  )
}

createRoot(document.getElementById('root')).render(<App />)
