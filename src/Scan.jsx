import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useStore } from './App'

export function Model(props) {
  const { nodes, materials } = useGLTF('./models/scan-transformed.glb')
  const { target, setLerping } = useStore((state) => state)

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_0.geometry} material={materials.material_0} />

      {/* A box used for raycasting since the photogrammetry geometry has so many faces that it makes the raycaster slow */}
      <mesh
        position={[0, -0.25, -0.6]}
        rotation-y={-Math.PI / 64}
        onDoubleClick={({ point }) => {
          target.copy(point)
          setLerping(true)
        }}>
        <boxGeometry args={[30, 3, 0.1]} />
        <meshBasicMaterial wireframe visible={false} />
      </mesh>
    </group>
  )
}

useGLTF.preload('./models/scan-transformed.glb')
