import { useState } from 'react'

export default function PolyHedron({ children, color, ...props }) {
  const [hovered, hover] = useState(true)
  return (
    <mesh
      {...props}
      onPointerOver={() => hover(false)}
      onPointerOut={() => hover(true)}>
      {children}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={!hovered ? 4 : 0}
      />
    </mesh>
  )
}
