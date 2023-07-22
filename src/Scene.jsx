import { useGLTF } from '@react-three/drei'
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'
import { useState } from 'react'
import { useStore } from './App'

function Selectable({ geometry, material, position }) {
  const [hovered, hover] = useState(null)
  const { setOrbitmode, setAutoRotate, to } = useStore((state) => state)

  return (
    <Select enabled={hovered}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          hover(true)
        }}
        onPointerOut={() => hover(false)}
        onClick={(e) => {
          e.stopPropagation()
          to.set(...position)
          setOrbitmode(true)
          setTimeout(() => setAutoRotate(true), 1000)
        }}
        geometry={geometry}
        material={material}
        position={position}
      />
    </Select>
  )
}

export default function Scene() {
  const { nodes, materials } = useGLTF('./models/scene-transformed.glb')

  return (
    <group dispose={null}>
      <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} scale={[10, 1, 10]} />
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor="white" edgeStrength={100} width={1000} />
        </EffectComposer>
        <Selectable geometry={nodes.Cube.geometry} material={materials.Material} position={[8, 1, 8]} />
        <Selectable geometry={nodes.Cylinder.geometry} material={nodes.Cylinder.material} position={[8, 1, -8]} />
        <Selectable geometry={nodes.Icosphere.geometry} material={nodes.Icosphere.material} position={[-8, 1, -8]} />
        <Selectable geometry={nodes.Cone.geometry} material={nodes.Cone.material} position={[-8, 1, 8]} />
        <Selectable geometry={nodes.Suzanne.geometry} material={nodes.Suzanne.material} position={[0, 1, 0]} />
      </Selection>
    </group>
  )
}

useGLTF.preload('./models/scene-transformed.glb')
