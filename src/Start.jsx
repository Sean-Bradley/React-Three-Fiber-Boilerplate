import { useEffect, useRef } from 'react'
import { useCylinder } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import { useStore } from './App'

export default function Start({ position }) {
  const [ref] = useCylinder(() => ({ args: [3.78, 3.78, 0.267, 12], mass: 0, position: position, material: 'ground' }), useRef())
  const { nodes, materials } = useGLTF('./models/start.glb')
  const groundObjects = useStore((state) => state.groundObjects)

  useEffect(() => {
    const id = ref.current.id
    groundObjects[id] = ref.current
    return () => {
      delete groundObjects[id]
    }
  }, [groundObjects, ref])

  useEffect(() => {
    const interval = setInterval(() => {
      materials['Material.001'].map.rotation += Math.PI
    }, 500)
    return () => clearInterval(interval)
  }, [materials])

  return (
    <group dispose={null}>
      <mesh ref={ref} geometry={nodes.Cylinder.geometry} material={materials['Material.001']} receiveShadow />
    </group>
  )
}

useGLTF.preload('./models/start.glb')
