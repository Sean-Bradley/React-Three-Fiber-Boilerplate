import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Box({ parentCount, setParentCount, ...props }) {
  const ref = useRef()
  const [count, setCount] = useState(0)

  console.log('Box ' + props.name + ' count=' + count)

  useFrame((_, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += 0.5 * delta
  })

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setParentCount(parentCount + 1)
        setCount(count + 1)
      }}>
      <boxGeometry />
      <meshBasicMaterial color={'lime'} wireframe />
    </mesh>
  )
}
