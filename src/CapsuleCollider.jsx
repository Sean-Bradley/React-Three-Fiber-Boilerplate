// import { useFrame } from '@react-three/fiber'
// import { useEffect } from 'react'
// import { useMemo, useRef } from 'react'
// import { Vector3 } from 'three'
// import { Capsule } from 'three/examples/jsm/math/Capsule.js'
// import * as Constants from './Constants'

// export default function CapsuleCollider({ id, radius, octree, position, colliders, children }) {
//   const ref = useRef()
//   const capsule = useMemo(() => new Capsule(new Vector3(...position), new Vector3([position[0], position[1] + 1, position[2]]), radius), [position, radius])
//   const velocity = useMemo(() => new Vector3(), [])

//   useEffect(() => {
//     console.log('adding reference to this capsule collider')
//     colliders[id] = { capsule: capsule, velocity: velocity }
//   }, [colliders, id, capsule, velocity])

//   function updateCapsule(delta, octree, capsule, velocity) {
//     const result = octree.capsuleIntersect(capsule)
//     let playerOnFloor = false
//     if (result) {
//       playerOnFloor = result.normal.y > 0
//       if (!playerOnFloor) {
//         velocity.addScaledVector(result.normal, -result.normal.dot(velocity))
//       }
//       capsule.translate(result.normal.multiplyScalar(result.depth))
//     }
//     ref.current.position.copy(capsule.start)
//     return playerOnFloor
//   }

//   useFrame((_, delta) => {
//     const deltaSteps = Math.min(0.05, delta) / Constants.frameSteps
//     for (let i = 0; i < Constants.frameSteps; i++) {
//       updateCapsule(deltaSteps, octree, capsule, velocity)
//     }
//   })

//   return <group ref={ref}>{children}</group>
// }
