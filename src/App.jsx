import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Room } from './Room'
import { ArmChair } from './ArmChair'
import { useState } from 'react'

export default function App() {
  const [selected, setSelected] = useState(0)

  return (
    <>
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
        <ArmChair selected={selected} />
        <OrbitControls target={[1.5, 0.8, 1.5]} minPolarAngle={0} maxPolarAngle={Math.PI / 2 + Math.PI / 12} />
      </Canvas>
      <input id="btn0" className="btn" type="image" src="./img/fabric_pattern_05.png" alt="Fabric 0" onPointerDown={() => setSelected(0)} draggable={false} />
      <input id="btn1" className="btn" type="image" src="./img/leather_red.png" alt="Fabric 1" onPointerDown={() => setSelected(1)} draggable={false} />
      <input id="btn2" className="btn" type="image" src="./img/fabric_pattern_7.png" alt="Fabric 2" onPointerDown={() => setSelected(2)} draggable={false} />
      <input id="btn3" className="btn" type="image" src="./img/book_pattern.png" alt="Fabric 3" onPointerDown={() => setSelected(3)} draggable={false} />
      <input id="btn4" className="btn" type="image" src="./img/denim_fabric_02.png" alt="Fabric 4" onPointerDown={() => setSelected(4)} draggable={false} />
    </>
  )
}
