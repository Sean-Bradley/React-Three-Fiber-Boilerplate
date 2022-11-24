import { useGLTF } from '@react-three/drei'
import useOctree from './useOctree'
import Player from './Player'
import useOctreeHelper from './useOctreeHelper'

export default function Arena({ mouseTime }) {
  //console.log('in Arena')
  const { nodes, scene } = useGLTF('./models/scene-transformed.glb')
  const worldOctree = useOctree(scene)
  useOctreeHelper(worldOctree)

  return (
    <>
      <group dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.Suzanne007.geometry} material={nodes.Suzanne007.material} position={[1.74, 1.04, 24.97]} />
      </group>
      <Player mouseTime={mouseTime} worldOctree={worldOctree} />
    </>
  )
}
