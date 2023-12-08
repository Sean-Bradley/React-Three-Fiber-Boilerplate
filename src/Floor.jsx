import { useRef, useEffect } from 'react'
import { usePlane } from '@react-three/cannon'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useStore } from './App'

export default function Floor() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], material: 'ground' }), useRef())
  const texture = useLoader(TextureLoader, '/img/grid.png')
  const groundObjects = useStore((state) => state.groundObjects)

  useEffect(() => {
    const id = ref.current.id
    groundObjects[id] = ref.current
    return () => {
      delete groundObjects[id]
    }
  }, [groundObjects, ref])

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
