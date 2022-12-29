import { useGLTF, Hud, OrthographicCamera } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
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

export function ArmChair() {
  const [selected, setSelected] = useState(0)

  const ref = useRef()
  const { nodes, materials } = useGLTF('./models/armchair-transformed.glb')

  const materialOverrides = useMemo(() => {
    return {
      0: materials.fabric_pattern_05,
      1: materials.red_leather,
      2: materials.fabric_pattern_7,
      3: materials.book_pattern,
      4: materials.denim_fabric_02
    }
  }, [materials])

  return (
    <>
      <group dispose={null} position={[1.5, 0.299, 1.5]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh ref={ref} geometry={nodes.armchair001_1.geometry} material={materialOverrides[selected]} castShadow receiveShadow />
          <mesh geometry={nodes.armchair001_3.geometry} material={materials.wooden_legs} castShadow />
        </group>
      </group>
      <MaterialMenu setSelected={setSelected} />
    </>
  )
}

useGLTF.preload('./models/armchair-transformed.glb')
