import { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { Color } from 'three'
import * as THREE from 'three'

export function Model() {
  const [hovered, setHovered] = useState(false)

  const { nodes, materials } = useGLTF('./models/shoe-draco.glb')

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  useControls('Shoe', () => {
    console.log('creating color pickers')

    // using reduce
    return Object.keys(materials).reduce(
      (acc, m) =>
        Object.assign(acc, {
          [m]: {
            value:
              '#' +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
            onChange: (v: THREE.Color) => {
              ;(materials[m] as THREE.MeshStandardMaterial).color = new Color(
                v
              )
            }
          }
        }),
      {}
    )
  })

  // JSX of glTF created using the command
  // npx gltfjsx .\public\models\shoe-draco.glb

  return (
    <group
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        ;(
          document.getElementById(
            'Shoe.' +
              ((e.object as THREE.Mesh).material as THREE.Material).name
          ) as HTMLElement
        ).focus()
      }}>
      <mesh
        geometry={(nodes.shoe as THREE.Mesh).geometry}
        material={materials.laces}
      />
      <mesh
        geometry={(nodes.shoe_1 as THREE.Mesh).geometry}
        material={materials.mesh}
      />
      <mesh
        geometry={(nodes.shoe_2 as THREE.Mesh).geometry}
        material={materials.caps}
      />
      <mesh
        geometry={(nodes.shoe_3 as THREE.Mesh).geometry}
        material={materials.inner}
      />
      <mesh
        geometry={(nodes.shoe_4 as THREE.Mesh).geometry}
        material={materials.sole}
      />
      <mesh
        geometry={(nodes.shoe_5 as THREE.Mesh).geometry}
        material={materials.stripes}
      />
      <mesh
        geometry={(nodes.shoe_6 as THREE.Mesh).geometry}
        material={materials.band}
      />
      <mesh
        geometry={(nodes.shoe_7 as THREE.Mesh).geometry}
        material={materials.patch}
      />
    </group>
  )
}

useGLTF.preload('./models/shoe-draco.glb')
