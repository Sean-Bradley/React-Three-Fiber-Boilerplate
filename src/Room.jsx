import { useGLTF } from '@react-three/drei'

export default function Room() {
  const { nodes, materials } = useGLTF('/models/room-transformed.glb')

  return (
    <>
      <group dispose={null} position-y={0.3}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.room_1.geometry} material={materials.ground_1} receiveShadow />
          <mesh geometry={nodes.room_2.geometry} material={materials.wall_1_2} castShadow receiveShadow />
          <mesh geometry={nodes.room_3.geometry} material={materials.room_5_30} receiveShadow />
          <mesh geometry={nodes.room_4.geometry} material={materials.white} castShadow receiveShadow />
          <mesh geometry={nodes.room_5.geometry} material={materials.flltgrey} material-transparent={true} material-opacity={0.1} />
          <mesh geometry={nodes.room_6.geometry} material={materials.dkgrey} receiveShadow />
          <mesh geometry={nodes.room_7.geometry} material={materials.amber} castShadow />
          <mesh geometry={nodes.room_8.geometry} material={materials.yellow_green} castShadow />
          <mesh geometry={nodes.room_9.geometry} material={materials.flbrown} castShadow />
        </group>
      </group>
    </>
  )
}

useGLTF.preload('/models/room-transformed.glb')
