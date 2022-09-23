import React from 'react'
import { Canvas } from '@react-three/fiber'
import Box from './Box'

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <Box position={[-1, 0, 0]} />
      <Box position={[1, 0, 0]} />
    </Canvas>
  )
}
