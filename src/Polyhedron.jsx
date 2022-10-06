import { useRef, useState, useEffect } from 'react'

export default function Polyhedron(props) {
  const ref = useRef()
  const [count, setCount] = useState(2)

  useEffect(() => {
    ref.current.geometry = ref.current.userData.polyhedron[count]
  })

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 3)
      }}>
      <meshBasicMaterial color={props.color} wireframe={true} />
    </mesh>
  )
}
