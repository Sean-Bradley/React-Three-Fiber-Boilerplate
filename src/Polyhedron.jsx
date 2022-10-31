import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
//import { useControls } from 'leva'

export default function Polyhedron(props) {
  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.rotation.x += 0.2 * delta
    ref.current.rotation.y += 0.05 * delta
  })

  // useControls(
  //   props.name,
  //   {
  //     transparent: {
  //       value: false,
  //       onChange: (v) => {
  //         ref.current.material.transparent = v
  //         ref.current.material.needsUpdate = true
  //       }
  //     },
  //     opacity: {
  //       value: 0.6,
  //       min: 0,
  //       max: 1,
  //       step: 0.01,
  //       onChange: (v) => {
  //         ref.current.material.opacity = v
  //       }
  //     }
  //   },
  //   { collapsed: true }
  // )

  return (
    <mesh {...props} ref={ref} castShadow>
      <icosahedronGeometry args={[1, 1]} />
    </mesh>
  )
}
