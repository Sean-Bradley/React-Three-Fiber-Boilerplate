import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color } from 'three'
import { Text } from '@react-three/drei'

export default function Box({ text, ...props }) {
  const ref = useRef()
  const black = useMemo(() => new Color('black'), [])
  const lime = useMemo(() => new Color('lime'), [])
  const [hovered, setHovered] = useState(false)

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2.5
    const y = (mouse.y * viewport.height) / 2.5
    ref.current.lookAt(x, y, 1)
    ref.current.material.color.lerp(hovered ? lime : black, 0.05)
  })

  return (
    <mesh {...props} ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <boxGeometry />
      <meshStandardMaterial color={lime} />
      <Text fontSize={0.5} position-z={0.501}>
        {text}
      </Text>
      {props.children}
    </mesh>
  )
}