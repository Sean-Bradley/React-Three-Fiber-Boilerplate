import { useGLTF } from '@react-three/drei'
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'
import { useState } from 'react'

function Suzanne({ geometry, material, position }) {
  const [hovered, hover] = useState(null)
  return (
    <Select enabled={hovered}>
      <mesh
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        geometry={geometry}
        material={material}
        position={position}
      />
    </Select>
  )
}

function Cube({ geometry, material, position }) {
  const [hovered, hover] = useState(null)
  return (
    <Select enabled={hovered}>
      <mesh
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        geometry={geometry}
        material={material}
        position={position}
      />
    </Select>
  )
}

function Cylinder({ geometry, material, position }) {
  const [hovered, hover] = useState(null)
  return (
    <Select enabled={hovered}>
      <mesh
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        geometry={geometry}
        material={material}
        position={position}
      />
    </Select>
  )
}

function Icosphere({ geometry, material, position }) {
  const [hovered, hover] = useState(null)
  return (
    <Select enabled={hovered}>
      <mesh
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        geometry={geometry}
        material={material}
        position={position}
      />
    </Select>
  )
}

function Cone({ geometry, material, position }) {
  const [hovered, hover] = useState(null)
  return (
    <Select enabled={hovered}>
      <mesh
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        geometry={geometry}
        material={material}
        position={position}
      />
    </Select>
  )
}

export default function Model() {
  const { nodes, materials } = useGLTF('./models/scene-transformed.glb')

  return (
    <group dispose={null}>
      <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} scale={[10, 1, 10]} />
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor="white" edgeStrength={100} width={500} />
        </EffectComposer>
        <Cube geometry={nodes.Cube.geometry} material={materials.Material} position={[8, 1, 8]} />
        <Cylinder geometry={nodes.Cylinder.geometry} material={nodes.Cylinder.material} position={[8, 1, -8]} />
        <Icosphere geometry={nodes.Icosphere.geometry} material={nodes.Icosphere.material} position={[-8, 1, -8]} />
        <Cone geometry={nodes.Cone.geometry} material={nodes.Cone.material} position={[-8, 1, 8]} />
        <Suzanne geometry={nodes.Suzanne.geometry} material={nodes.Suzanne.material} position={[0, 1, 0]} />
      </Selection>
    </group>
  )
}

useGLTF.preload('./models/scene-transformed.glb')
