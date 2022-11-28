import { useGLTF, useBVH, useHelper } from '@react-three/drei'
import useOctree from './useOctree'
import Player from './Player'
import useOctreeHelper from './useOctreeHelper'
import { useRef } from 'react'
import SphereCollider from './SphereCollider'
import { Vector3, Matrix4, BufferGeometry, Mesh } from 'three'
import Ball from './Ball'
import { MeshBVH, MeshBVHVisualizer, computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'
import { useEffect, useMemo } from 'react'

const ballCount = 100
const radius = 0.2
const balls = [...Array(ballCount)].map(() => ({ position: [Math.random() * 50 - 25, 20, Math.random() * 50 - 25] }))
const v1 = new Vector3()
const v2 = new Vector3()
const v3 = new Vector3()
let octree
const invMat = new Matrix4()
export default function Physics({ clicked }) {
  const { nodes } = useGLTF('./models/scene-transformed.glb')
  //const { nodes, materials } = useGLTF('./models/sh3d-test.glb')
  //const octree = useOctree(scene)
  //useOctreeHelper(octree)
  const octree = useMemo(() => nodes.Suzanne007)
  //useBVH(octree)
  BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
  BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
  Mesh.prototype.raycast = acceleratedRaycast

  const bvh = new MeshBVH(octree.geometry)
  useHelper(octree, MeshBVHVisualizer, 10)
  octree.geometry.computeBoundsTree()
  //console.log(octree)

  const colliders = useRef([])

  function checkSphereCollisions(sphere, velocity) {
    for (let i = 0, length = colliders.current.length; i < length; i++) {
      const c = colliders.current[i]

      if (c.sphere) {
        const d2 = sphere.center.distanceToSquared(c.sphere.center)
        const r = sphere.radius + c.sphere.radius
        const r2 = r * r

        if (d2 < r2) {
          const normal = v1.subVectors(sphere.center, c.sphere.center).normalize()
          const impact1 = v2.copy(normal).multiplyScalar(normal.dot(velocity))
          const impact2 = v3.copy(normal).multiplyScalar(normal.dot(c.velocity))
          velocity.add(impact2).sub(impact1)
          c.velocity.add(impact1).sub(impact2)
          // const d = (r - Math.sqrt(d2)) / 2
          // sphere.center.addScaledVector(normal, d)
          // c.sphere.center.addScaledVector(normal, -d)
        }
      } else if (c.capsule) {
        const center = v1.addVectors(c.capsule.start, c.capsule.end).multiplyScalar(0.5)
        const r = sphere.radius + c.capsule.radius
        const r2 = r * r
        for (const point of [c.capsule.start, c.capsule.end, center]) {
          const d2 = point.distanceToSquared(sphere.center)
          if (d2 < r2) {
            const normal = v1.subVectors(point, sphere.center).normalize()
            const impact1 = v2.copy(normal).multiplyScalar(normal.dot(velocity))
            const impact2 = v3.copy(normal).multiplyScalar(normal.dot(c.velocity))
            velocity.add(impact2).sub(impact1)
            c.velocity.add(impact1).sub(impact2)
            //const d = (r - Math.sqrt(d2)) / 2
            //sphere.center.addScaledVector(normal, -d)
          }
        }
      }
    }
  }

  return (
    <>
      <group dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.Suzanne007.geometry} material={nodes.Suzanne007.material} position={[1.74, 1.04, 24.97]} />
      </group>
      {/* <group dispose={null}>
        <mesh geometry={nodes.HomeIdea3D.geometry} material={materials['Default OBJ']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.floor2.geometry} material={materials['Default OBJ']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.floor3.geometry} material={materials['Default OBJ']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group> */}
      {balls.map(({ position }, i) => (
        <SphereCollider key={i} id={i} radius={radius} octree={octree} position={position} colliders={colliders.current} checkSphereCollisions={checkSphereCollisions}>
          <Ball radius={radius} />
        </SphereCollider>
      ))}
      {/* <Player clicked={clicked} ballCount={ballCount} octree={octree} colliders={colliders.current} /> */}
    </>
  )
}
