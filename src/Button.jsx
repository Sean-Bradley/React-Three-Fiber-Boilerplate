import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { Color } from 'three'

const black = new Color('black')

export default function Button(props) {
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  const [selected, setSelected] = useState(false)
  const colorTo = useMemo(
    () => new Color(Math.floor(Math.random() * 16777216)),
    []
  )

  useFrame(() => {
    ref.current.rotation.x = hovered
      ? MathUtils.lerp(ref.current.rotation.x, -Math.PI * 2, 0.025)
      : MathUtils.lerp(ref.current.rotation.x, 0, 0.025)

    ref.current.position.z = selected
      ? MathUtils.lerp(ref.current.position.z, 0, 0.025)
      : MathUtils.lerp(ref.current.position.z, -3, 0.025)

    ref.current.material.color.lerp(selected ? colorTo : black, 0.025)
  })

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setSelected(!selected)
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow>
      <icosahedronGeometry />
      <meshPhysicalMaterial
        roughness={0}
        metalness={0}
        thickness={3.12}
        ior={1.74}
        transmission={1.0}
      />
    </mesh>
  )
}
