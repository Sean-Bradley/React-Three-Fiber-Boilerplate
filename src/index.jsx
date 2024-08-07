import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import './styles.css'

function App() {
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas camera={{ position: [0, 0, 2] }}>
      <App />
    </Canvas>
  </StrictMode>
)
