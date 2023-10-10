import { useRef } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'
import { MeshProps, useFrame } from '@react-three/fiber'

export default function Polyhedron(props: MeshProps) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    ref.current!.rotation.x += 0.2 * delta
    ref.current!.rotation.y += 0.05 * delta
  })

  useControls(props.name as string, {
    wireframe: {
      value: false,
      onChange: (v: boolean) => {
        ;(ref.current.material as
          | THREE.MeshBasicMaterial
          | THREE.MeshPhongMaterial
          | THREE.MeshNormalMaterial
          | THREE.MeshStandardMaterial).wireframe = v
      }
    },
    flatShading: {
      value: true,
      onChange: (v: boolean) => {
        ;(ref.current.material as
          | THREE.MeshPhongMaterial
          | THREE.MeshNormalMaterial
          | THREE.MeshStandardMaterial).flatShading = v
        ;(ref.current.material as
          | THREE.MeshBasicMaterial
          | THREE.MeshPhongMaterial
          | THREE.MeshNormalMaterial
          | THREE.MeshStandardMaterial).needsUpdate = true
      }
    },
    color: {
      value: 'lime',
      onChange: (v: THREE.ColorRepresentation) => {
        ;(ref.current.material as
          | THREE.MeshBasicMaterial
          | THREE.MeshPhongMaterial
          | THREE.MeshStandardMaterial).color = new THREE.Color(v)
      }
    }
  })

  return (
    <mesh {...props} ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
    </mesh>
  )
}
