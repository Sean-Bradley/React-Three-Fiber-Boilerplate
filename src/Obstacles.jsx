import { useEffect, useRef } from 'react'
import { useBox } from '@react-three/cannon'
import { useStore } from './Game'

const obstacles = [...Array(50)].map((_, i) => ({
  position: [(Math.random() - 0.5) * 25, 2 * i, (Math.random() - 0.5) * 25],
  args: [Math.random() * 10, Math.random() * 2, Math.random() * 5]
}))

function Obstacle({ args, position, ...props }) {
  const [ref] = useBox(() => ({ args, mass: 1, position: position, ...props }), useRef())

  const groundObjects = useStore((state) => state.groundObjects)

  useEffect(() => {
    const id = ref.current.id
    groundObjects[id] = ref.current
    return () => {
      delete groundObjects[id]
    }
  }, [groundObjects, ref])

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[...args]} />
      <meshStandardMaterial />
    </mesh>
  )
}

export default function Obstacles() {
  return (
    <>
      {obstacles.map(({ position, args }, i) => (
        <Obstacle key={i} position={position} args={args} material={'ground'}></Obstacle>
      ))}
    </>
  )
}
