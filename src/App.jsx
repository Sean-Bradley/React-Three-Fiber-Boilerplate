import { Stats, Environment, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Arena from './Arena'
import { useState } from 'react'

export default function App() {
  const [mouseTime, setMouseTime] = useState(0)
  return (
    <Canvas
      shadows
      onPointerDown={() => {
        setMouseTime(performance.now())
      }}>
      <directionalLight
        intensity={1}
        castShadow={true}
        shadow-bias={-0.00015}
        shadow-radius={4}
        shadow-blur={10}
        shadow-mapSize={[2048, 2048]}
        position={[85.0, 80.0, 70.0]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
      <Arena mouseTime={mouseTime} />
      <PointerLockControls />
      <Stats />
    </Canvas>
  )
}
