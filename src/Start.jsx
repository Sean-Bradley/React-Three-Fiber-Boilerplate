import { useEffect, useRef } from 'react'
import { useCylinder } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useStore } from './Game'

export default function Start({ position }) {
  const [ref] = useCylinder(() => ({ args: [3.78, 3.78, 0.267, 12], mass: 0, position: position, material: 'ground' }), useRef())
  const { nodes, materials } = useGLTF('./models/start.glb')
  const groundObjects = useStore((state) => state.groundObjects)
  const interval = useRef(0)

  useEffect(() => {
    const id = ref.current.id
    groundObjects[id] = ref.current
    return () => {
      delete groundObjects[id]
    }
  }, [groundObjects, ref])

  useFrame((_, delta) => {
    interval.current += delta
    if (interval.current > 0.5) {
      interval.current -= 0.5
      materials['Material.001'].map.rotation += Math.PI
    }
  })

  return (
    <group dispose={null}>
      <mesh ref={ref} position={position} geometry={nodes.Cylinder.geometry} material={materials['Material.001']} receiveShadow />
    </group>
  )
}

useGLTF.preload('./models/start.glb')
