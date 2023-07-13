import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Vector3 } from 'three'

export default function Spinner({ position, colliders, checkSphereCollisions }) {
  const ref = useRef()
  const colliderRef1 = useRef()
  const colliderRef2 = useRef()

  const sphere1 = useMemo(() => new Sphere(new Vector3(), 0.5), [])
  const sphere2 = useMemo(() => new Sphere(new Vector3(), 0.5), [])

  useEffect(() => {
    console.log('adding reference to this sphere collider')
    const id = colliders.length + 1

    colliders[id] = { sphere: sphere1, velocity: new Vector3() }
    colliders[id + 1] = { sphere: sphere2, velocity: new Vector3() }

    //console.log(colliders)
  }, [colliders, sphere1, sphere2])

  useFrame((_, delta) => {
    ref.current.rotation.y += delta
    //console.log(sphere.position)
    let lastSphereCenter = sphere1.center.clone()
    colliderRef1.current.getWorldPosition(sphere1.center)
    sphere1.velocity = lastSphereCenter.sub(sphere1.center)
    //console.log(sphere.velocity )
    checkSphereCollisions(sphere1, sphere1.velocity)

    lastSphereCenter = sphere2.center.clone()
    colliderRef2.current.getWorldPosition(sphere2.center)
    sphere2.velocity = lastSphereCenter.sub(sphere2.center)
    //console.log(sphere.velocity )
    checkSphereCollisions(sphere2, sphere2.velocity)
  })

  return (
    <>
      <mesh ref={ref} castShadow receiveShadow position={position}>
        <cylinderGeometry args={[0.25, 0.25, 1.5]} />
        <meshStandardMaterial wireframe={true} />
        <mesh rotation={[0, 0, -Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.25, 4]} />
          <meshStandardMaterial wireframe={true} />
        </mesh>
        <mesh ref={colliderRef1} position={[2, 0, 0]}>
          <sphereGeometry args={[sphere1.radius]} />
          <meshNormalMaterial />
        </mesh>
        <mesh ref={colliderRef2} position={[1, 0, 0]}>
          <sphereGeometry args={[sphere2.radius]} />
          <meshNormalMaterial />
        </mesh>
      </mesh>
    </>
  )
}
