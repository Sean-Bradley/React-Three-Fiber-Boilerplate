import * as THREE from 'three'
import { ThreeElements } from '@react-three/fiber'
import { useRef, useState } from 'react'

type Polyhedron = ThreeElements['mesh'] & {
  polyhedron: THREE.BufferGeometry[]
  color: THREE.Color | String
}

export default function Polyhedron({
  polyhedron,
  color,
  ...props
}: Polyhedron) {
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
