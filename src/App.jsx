import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Hud, OrthographicCamera } from '@react-three/drei'
import { Room } from './Room'
import { ArmChair } from './ArmChair'
import { useRef, useState } from 'react'
import { TextureLoader, MathUtils } from 'three'

function Button({ id, texture, position, setSelected }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  useFrame(() => {
    ref.current.scale.y = ref.current.scale.x = MathUtils.lerp(ref.current.scale.y, hovered ? 1.5 : 1, 0.25)
  })
  return (
    <mesh ref={ref} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onPointerDown={() => setSelected(id)}>
      <circleGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

function MaterialMenu({ setSelected }) {
  const texture = useLoader(TextureLoader, [
    './img/fabric_pattern_05.png',
    './img/leather_red.png',
    './img/fabric_pattern_7.png',
    './img/book_pattern.png',
    './img/denim_fabric_02.png'
  ])

  return (
    <Hud>
      <OrthographicCamera makeDefault position={[0, 0, 0.1]} zoom={50} />
      <Button id={0} texture={texture[0]} position={[-6, -6, 0]} setSelected={setSelected} />
      <Button id={1} texture={texture[1]} position={[-3, -6, 0]} setSelected={setSelected} />
      <Button id={2} texture={texture[2]} position={[-0, -6, 0]} setSelected={setSelected} />
      <Button id={3} texture={texture[3]} position={[3, -6, 0]} setSelected={setSelected} />
      <Button id={4} texture={texture[4]} position={[6, -6, 0]} setSelected={setSelected} />
    </Hud>
  )
}

export default function App() {
  const [selected, setSelected] = useState(0)

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
      <ArmChair selected={selected} />
      <OrbitControls target={[1.5, 0.8, 1.5]} minPolarAngle={0} maxPolarAngle={Math.PI / 2 + Math.PI / 12} />
      <MaterialMenu setSelected={setSelected} />
    </Canvas>
  )
}
