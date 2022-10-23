import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Box from './Box'

export default function App() {
  const [count, setCount] = useState(0)

  console.log('App count=' + count)

  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <Box position={[-0.75, 0, 0]} name="A" parentCount={count} setParentCount={setCount} />
      <Box position={[0.75, 0, 0]} name="B" parentCount={count} setParentCount={setCount} />
    </Canvas>
  )
}
