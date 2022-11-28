import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import { useMemo, useRef } from 'react'
import { Sphere, Vector3 } from 'three'

const GRAVITY = 30
const STEPS_PER_FRAME = 5

export default function SphereCollider({ id, radius, octree, position, colliders, checkSphereCollisions, children }) {
  const ref = useRef()
  const sphere = useMemo(() => new Sphere(new Vector3(...position), radius), [position, radius])
  const velocity = useMemo(() => new Vector3(), [])

  useEffect(() => {
    console.log('adding reference to this sphere collider')
    colliders[id] = { sphere: sphere, velocity: velocity }
  }, [colliders, id, sphere, velocity])

  function updateSphere(delta, octree, sphere, velocity) {
    sphere.center.addScaledVector(velocity, delta)

    //console.log(octree.geometry.boundsTree)
    const result = octree.geometry.boundsTree.intersectsSphere(sphere)
    // const result = octree.geometry.boundsTree.shapecast({
    //   intersectsBounds: (box) => {
    //     //console.log('box')
    //     return box.intersectsSphere(sphere)
    //     // if (box.intersectsSphere(sphere)) {
    //     //   console.log(box)
    //     //   return box //.intersectsSphere(sphere)
    //     // }
    //   },
    //   intersectsTriangle: (tri) => {
    //     //console.log('tri')
    //     //if (tri.intersectsSphere(sphere)) return tri.plane
    //   }
    // })

    //console.log(result)
    //const result = false //octree.intersectsSphere(sphere)

    if (result) {
      //console.log(result)
      //velocity.addScaledVector(result.normal, -result.normal.dot(velocity) * 1.5)
      //sphere.center.add(result.normal.multiplyScalar(result.depth))
    } else {
      velocity.y -= GRAVITY * delta
    }

    const damping = Math.exp(-1.5 * delta) - 1
    velocity.addScaledVector(velocity, damping)

    checkSphereCollisions(sphere, velocity)

    ref.current.position.copy(sphere.center)
  }

  useFrame((_, delta) => {
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      updateSphere(deltaSteps, octree, sphere, velocity)
    }
  })

  return <group ref={ref}>{children}</group>
}
