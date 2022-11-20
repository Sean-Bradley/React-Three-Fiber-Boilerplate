import { useMemo } from 'react'
import { Octree } from 'three/examples/jsm/math/Octree'
import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper'
import { useThree } from '@react-three/fiber'

export default function useOctree(scene) {
  //console.log('in useOctree')
  const state = useThree()
  const worldOctree = useMemo(() => {
    console.log('new Octree')
    const octree = new Octree()
    octree.fromGraphNode(scene)
    state.scene.add(new OctreeHelper(octree))
    return octree
  }, [scene, state.scene])

  return worldOctree
}
