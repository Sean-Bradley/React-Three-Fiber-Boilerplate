import { useMemo } from 'react'
import { Octree } from 'three/examples/jsm/math/Octree'
import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function useOctree(scene) {
  //console.log('in useOctree')
  const state = useThree()
  const worldOctree = useMemo(() => {
    console.log('new Octree')
    const octree = new Octree()
    octree.fromGraphNode(scene)
    const helper = new OctreeHelper(octree)
    helper.name = 'helper'
    state.scene.add(helper)
    return octree
  }, [scene, state.scene])

  useControls('octree', {
    visible: {
      value: true,
      onChange: (v) => {
        state.scene.getObjectByName('helper').visible = v
      }
    }
  })

  return worldOctree
}
