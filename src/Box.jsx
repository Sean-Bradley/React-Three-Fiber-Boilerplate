import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Box(props) {
  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.rotation.x += 1 * delta
    ref.current.rotation.y += 0.5 * delta
  })

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => console.log('clicked ' + ref.current.name)}
      onPointerOver={() => console.log('pointer over ' + ref.current.name)}
      onPointerOut={() => console.log('pointer out ' + ref.current.name)}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe={true} />
    </mesh>
  )
}
