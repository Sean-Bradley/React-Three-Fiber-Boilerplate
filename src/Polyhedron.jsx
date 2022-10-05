import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Polyhedron(props) {
  const ref = useRef()
  const [count, setCount] = useState(2)

  useEffect(() => {
    //console.log(ref.current.uuid)
    ref.current.geometry = ref.current.userData.polyhedron[count]
  })

  useFrame(() => {
    //ref.current.rotation.x = rotX
    // ref.current.rotation.y += 0.5 * delta
  })

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => {
        setCount((count + 1) % 3)
      }}>
      <meshBasicMaterial color={'lime'} wireframe={true} />
    </mesh>
  )
}
