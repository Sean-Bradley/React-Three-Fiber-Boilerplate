import { Canvas } from '@react-three/fiber'
import Box from './Box'
import { Stats, OrbitControls } from '@react-three/drei'

export default function App() {
  return (
    <Canvas camera={{ position: [1, 2, 3] }}>
      <Box />
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
      <Stats />
    </Canvas>
  )
}
