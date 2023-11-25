import { useRef, useEffect, useState, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import useKeyboard from './useKeyboard'
import { useFrame } from '@react-three/fiber'
import { AnimationMixer } from 'three'

export default function Eve() {
  const ref = useRef()
  const { nodes, materials } = useGLTF('./models/eve.glb')
  const idleAnimation = useGLTF('./models/eve@idle.glb').animations
  const walkAnimation = useGLTF('./models/eve@walking.glb').animations
  const runningAnimation = useGLTF('./models/eve@running.glb').animations
  const jumpAnimation = useGLTF('./models/eve@jump.glb').animations
  const poseAnimation = useGLTF('./models/eve@pose.glb').animations
  const actions = useMemo(() => [], [])
  const mixer = useMemo(() => new AnimationMixer(), [])
  const keyboard = useKeyboard()
  const [action, setAction] = useState()
  let [wait, setWait] = useState(false)
  let actionAssigned

  useEffect(() => {
    actions['idle'] = mixer.clipAction(idleAnimation[0], ref.current)
    actions['walk'] = mixer.clipAction(walkAnimation[0], ref.current)
    actions['running'] = mixer.clipAction(runningAnimation[0], ref.current)
    actions['jump'] = mixer.clipAction(jumpAnimation[0], ref.current)
    actions['pose'] = mixer.clipAction(poseAnimation[0], ref.current)

    actions['idle'].play()
  }, [])

  useEffect(() => {
    action?.reset().fadeIn(0.1).play()
    return () => {
      action?.fadeOut(0.1)
    }
  }, [action])

  useFrame((_, delta) => {
    if (!wait) {
      actionAssigned = false

      if (keyboard['KeyW']) {
        setAction(actions['walk'])
        actionAssigned = true
      }

      if (keyboard['KeyW'] && keyboard['ShiftLeft']) {
        setAction(actions['running'])
        actionAssigned = true
      }

      if (keyboard['Space']) {
        setAction(actions['jump'])
        actionAssigned = true
        setWait(true) // wait for jump to finish
        setTimeout(() => setWait(false), 1000)
      }

      if (keyboard['KeyQ']) {
        setAction(actions['pose'])
        actionAssigned = true
      }

      !actionAssigned && setAction(actions['idle'])
    }

    mixer.update(delta)
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

useGLTF.preload(['./models/eve.glb', './models/eve@idle.glb', './models/eve@running.glb', './models/eve@walking.glb', './models/eve@jump.glb', './models/eve@pose.glb'])
