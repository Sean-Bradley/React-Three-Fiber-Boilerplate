import { useGLTF } from '@react-three/drei'

export default function Monkey(props) {
  const { nodes, materials } = useGLTF('./models/monkey.glb')
  return (
    <group {...props} dispose={null} scale={[4, 4, 4]}>
      <mesh geometry={nodes.Suzanne.geometry} material={materials.Gold} />
      <mesh
        geometry={nodes.Suzanne001.geometry}
        material={materials.Silver}
        position={[-3.06, 0.03, 0.23]}
      />
      <mesh
        geometry={nodes.Suzanne002.geometry}
        material={materials.Copper}
        position={[2.61, -0.51, -0.93]}
      />
    </group>
  )
}

useGLTF.preload('./models/monkey.glb')
