import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { useStore } from './App'

export default function Eve() {
  const ref = useRef()
  const { nodes, materials } = useGLTF('https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve.glb')
  const idleAnimation = useGLTF('https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve@idle.glb').animations
  const walkAnimation = useGLTF('https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve@walking.glb').animations
  const runningAnimation = useGLTF('https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve@running.glb').animations
  const jumpAnimation = useGLTF('https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve@jump.glb').animations
  const poseAnimation = useGLTF('https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve@pose.glb').animations

  const { actions, mixer } = useStore((state) => state)

  useEffect(() => {
    actions['idle'] = mixer.clipAction(idleAnimation[0], ref.current)
    actions['walk'] = mixer.clipAction(walkAnimation[0], ref.current)
    actions['running'] = mixer.clipAction(runningAnimation[0], ref.current)
    actions['jump'] = mixer.clipAction(jumpAnimation[0], ref.current)
    actions['pose'] = mixer.clipAction(poseAnimation[0], ref.current)

    actions['idle'].play()
  }, [actions, mixer, idleAnimation, walkAnimation, runningAnimation, jumpAnimation, poseAnimation])

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

useGLTF.preload([
  'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve.glb',
  'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve@idle.glb',
  'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve@running.glb',
  'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve@walking.glb',
  'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve@jump.glb',
  'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@animationController/public/models/eve@pose.glb'
])
