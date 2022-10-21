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
      onPointerDown={(e) => console.log('pointer down ' + e.object.name)}
      onPointerUp={(e) => console.log('pointer up ' + e.object.name)}
      onPointerOver={(e) => console.log('pointer over ' + e.object.name)}
      onPointerOut={(e) => console.log('pointer out ' + e.object.name)}
      onUpdate={(self) => console.log(self)}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  )
}
