import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Room } from './Room'
import { ArmChair } from './ArmChair'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [2.25, 1, 2.25] }}>
      <Environment
        preset="forest"
        background
        ground={{
          height: 2,
          radius: 115,
          scale: 100
        }}
      />
      <directionalLight position={[5, 1.5, 3]} intensity={2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-bias={-0.0001} />
      <Room />
      <ArmChair />
      <OrbitControls target={[1.5, 0.8, 1.5]} minPolarAngle={0} maxPolarAngle={Math.PI / 2 + Math.PI / 12} />
    </Canvas>
  )
}
