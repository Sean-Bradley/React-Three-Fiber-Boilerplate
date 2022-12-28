import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import { useRef } from 'react'

export function ArmChair({ selected }) {
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
    </>
  )
}

useGLTF.preload('./models/armchair-transformed.glb')
