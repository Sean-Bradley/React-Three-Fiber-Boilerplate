import { useFrame, useLoader } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { MathUtils, TextureLoader } from 'three'

export default function Floor(props) {
  const normalMap = useLoader(TextureLoader, './img/NormalMap.png')

  const { nodes, materials } = useGLTF('./models/floor.glb')
  return (
    <group
      {...props}
      dispose={null}
      rotation-x={-Math.PI / 2}
      scale={[20, 1, 20]}>
      <mesh
        geometry={nodes.Plane.geometry}
        material={materials.brass_pan_01}
        material-normalMap={normalMap}
      />
    </group>
  )
}

useGLTF.preload('./models/floor.glb')
