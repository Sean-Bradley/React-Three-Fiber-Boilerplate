import { useEffect, useRef } from 'react'
import { useBox } from '@react-three/cannon'
import { useStore } from './App'

export default function Platform({ args, position, rotation }) {
  const [ref] = useBox(() => ({ args: args, mass: 0, position: position, rotation: rotation, material: 'ground' }), useRef())

  const groundObjects = useStore((state) => state.groundObjects)

  useEffect(() => {
    const id = ref.current.id
    groundObjects[id] = ref.current
    return () => {
      delete groundObjects[id]
    }
  }, [groundObjects, ref])

  return (
    <mesh ref={ref} receiveShadow rotation={rotation}>
      <boxGeometry args={args} />
      <meshStandardMaterial />
    </mesh>
  )
}
