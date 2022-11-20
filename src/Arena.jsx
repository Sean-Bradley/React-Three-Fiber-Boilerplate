import { useGLTF } from '@react-three/drei'
import useOctree from './useOctree'
import Player from './Player'

export default function Arena({ mouseTime }) {
  //console.log('in Arena')
  const { nodes, materials, scene } = useGLTF('./models/collision-world.glb')
  const worldOctree = useOctree(scene)

  return (
    <>
      <group dispose={null}>
        <mesh
          geometry={nodes.Cube004.geometry}
          material={materials['Material.001']}
          position={[7.68, -5.59, 26.38]}
          scale={0.5}
          castShadow
          receiveShadow
          material-envMapIntensity={0.4}
        />
      </group>
      <Player mouseTime={mouseTime} worldOctree={worldOctree} />
    </>
  )
}
