import { MeshProps } from '@react-three/fiber'
import { useRef, useState } from 'react'

interface IPolyhedron extends MeshProps {
  polyhedron: THREE.BufferGeometry[]
  color: THREE.Color | String
}

export default function Polyhedron({
  polyhedron,
  color,
  ...props
}: IPolyhedron) {
  const ref = useRef<THREE.Mesh>(null!)
  const [count, setCount] = useState(2)

  console.log(polyhedron[count].uuid)

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 3)
      }}
      geometry={polyhedron[count]}>
      <meshBasicMaterial color={color as THREE.Color} wireframe />
    </mesh>
  )
}
