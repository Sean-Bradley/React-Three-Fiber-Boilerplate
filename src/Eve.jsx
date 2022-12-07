import { useRef, useMemo } from 'react'
import { useGLTF, useAnimations, useMask } from '@react-three/drei'
import { useEffect } from 'react'
import { AnimationMixer, AnimationAction } from 'three'
import { useFrame } from '@react-three/fiber'

export default function Eve({ mixer, actions }) {
  const ref = useRef()
  const { nodes, materials, animations } = useGLTF('./models/eve.glb')
  const walkAnimation = useGLTF('./models/eve@walking.glb').animations
  const jumpAnimation = useGLTF('./models/eve@jump.glb').animations

  //const mixer = useMemo(() => new AnimationMixer(), [])

  useEffect(() => {
    actions['default'] = mixer.clipAction(animations[0], ref.current)
    actions['walk'] = mixer.clipAction(walkAnimation[0], ref.current)
    actions['jump'] = mixer.clipAction(jumpAnimation[0], ref.current)

    //console.log(actions)
    actions['walk'].play()
  })

  return (
    <group ref={ref} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Mesh" geometry={nodes.Mesh.geometry} material={materials.SpacePirate_M} skeleton={nodes.Mesh.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(['./models/eve.glb', './models/eve@walking.glb', './models/eve@jump.glb'])
