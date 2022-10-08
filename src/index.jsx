import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import './styles.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas camera={{ position: [4, 4, 1.5] }}>
      <App />
    </Canvas>
    <Leva />
  </StrictMode>
)
