import { useGLTF } from '@react-three/drei'

export default function Model() {
  const { nodes, materials } = useGLTF('./models/scene-transformed.glb')
  return (
    <group dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} position={[8, 1, 8]} />
      <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} scale={[10, 1, 10]} />
      <mesh geometry={nodes.Cylinder.geometry} material={nodes.Cylinder.material} position={[8, 1, -8]} />
      <mesh geometry={nodes.Icosphere.geometry} material={nodes.Icosphere.material} position={[-8, 1, -8]} />
      <mesh geometry={nodes.Cone.geometry} material={nodes.Cone.material} position={[-8, 1, 8]} />
      <mesh geometry={nodes.Suzanne.geometry} material={nodes.Suzanne.material} position={[0, 1, 0]} />
    </group>
  )
}

useGLTF.preload('./models/scene-transformed.glb')
