import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { LoopOnce } from 'three'

export default function Eve({ mixer, actions }) {
  const ref = useRef()
  const { nodes, materials, animations } = useGLTF('./models/eve.glb')
  const idleAnimation = useGLTF('./models/eve@idle.glb').animations
  const walkAnimation = useGLTF('./models/eve@walking.glb').animations
  const jumpAnimation = useGLTF('./models/eve@jump.glb').animations

  useEffect(() => {
    actions['default'] = mixer.clipAction(animations[0], ref.current)
    actions['idle'] = mixer.clipAction(idleAnimation[0], ref.current)
    actions['walk'] = mixer.clipAction(walkAnimation[0], ref.current)
    actions['jump'] = mixer.clipAction(jumpAnimation[0], ref.current)
    actions['jump'].loop = LoopOnce
    actions['jump'].clampWhenFinished = true

    actions['walk'].play()
  })

  return (
    <group ref={ref} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh castShadow name="Mesh" frustumCulled={false} geometry={nodes.Mesh.geometry} material={materials.SpacePirate_M} skeleton={nodes.Mesh.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(['./models/eve.glb', './models/eve@walking.glb', './models/eve@jump.glb'])
