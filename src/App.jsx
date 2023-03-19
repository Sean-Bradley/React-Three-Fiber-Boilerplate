import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import NeuralNetwork from './NeuralNetwork'

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <NeuralNetwork />
      <OrbitControls />
    </Canvas>
  )
}
