import { useRef } from 'react'
import { usePlane } from '@react-three/cannon'

export default function Floor(props) {
  const [ref] = usePlane(() => ({ ...props }), useRef())

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial />
    </mesh>
  )
}
