import { useMemo } from 'react'
import { Octree } from 'three/examples/jsm/math/Octree'

export default function useOctree(scene) {
  //console.log('in useOctree')
  const octree = useMemo(() => {
    console.log('new Octree')
    return new Octree().fromGraphNode(scene)
  }, [scene])

  return octree
}
