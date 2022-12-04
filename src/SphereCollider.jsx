import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import { useMemo, useRef } from 'react'
import { Sphere, Vector3 } from 'three'
import * as Constants from './Constants'

export default function SphereCollider({ id, radius, octree, position, colliders, checkSphereCollisions, children }) {
  const ref = useRef()
  //const normalArrowRef = useRef()
  //const rotationArrowRef = useRef()

  const sphere = useMemo(() => new Sphere(new Vector3(...position), radius), [position, radius])
  const velocity = useMemo(() => new Vector3(), [])
  // const angularVelocity = useMemo(() => new Vector3(), [])
  // const v0 = useMemo(() => new Vector3(), [])
  // const q = useMemo(() => new Quaternion(), [])
  
  useEffect(() => {
    console.log('adding reference to this sphere collider')
    colliders[id] = { sphere: sphere, velocity: velocity }
    //normalArrowRef.current.setColor(new Color(0xff0000))
    //rotationArrowRef.current.setColor(new Color(0x00ff00))
  }, [colliders, id, sphere, velocity])

  function updateSphere(delta, octree, sphere, velocity) {
    sphere.center.addScaledVector(velocity, delta)

    const result = octree.sphereIntersect(sphere)

    if (result) {
      const factor = -result.normal.dot(velocity)
      velocity.addScaledVector(result.normal, factor * 1.5)

      // angularVelocity.x += result.normal.x
      // angularVelocity.z += result.normal.z
      // angularVelocity.y += result.normal.y
      // rotationArrowRef.current.setDirection(result.normal.clone().normalize())

      sphere.center.add(result.normal.multiplyScalar(result.depth))

      // normalArrowRef.current.setDirection(result.normal.clone().normalize())
      // normalArrowRef.current.setLength(factor * 1.5)
      // normalArrowRef.current.position.copy(sphere.center)
    } else {
      velocity.y -= Constants.Gravity * delta
    }

    const damping = Math.exp(-1.5 * delta) - 1
    velocity.addScaledVector(velocity, damping)

    checkSphereCollisions(sphere, velocity)

    ref.current.position.copy(sphere.center)

    // q.setFromAxisAngle(angularVelocity, delta * radius).normalize()
    // ref.current.applyQuaternion(q)
    // angularVelocity.lerp(v0, delta)

  }

  useFrame((_, delta) => {
    const deltaSteps = Math.min(0.05, delta) / Constants.frameSteps
    for (let i = 0; i < Constants.frameSteps; i++) {
      updateSphere(deltaSteps, octree, sphere, velocity)
    }
  })

  return (
    <>
      {/* <arrowHelper ref={normalArrowRef} /> */}
      <group ref={ref}>
        {children}
        {/* <arrowHelper ref={rotationArrowRef} /> */}
      </group>
    </>
  )
}
