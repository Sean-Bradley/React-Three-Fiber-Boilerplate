import { useRef, useMemo, useEffect } from 'react'
import { Capsule } from 'three/examples/jsm/math/Capsule.js'
import { Vector3, IcosahedronGeometry, MeshStandardMaterial, Mesh, Sphere } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import useKeyboard from './useKeyboard'

const GRAVITY = 30
const STEPS_PER_FRAME = 5
const NUM_SPHERES = 100
const SPHERE_RADIUS = 0.2

export default function Player({ worldOctree, mouseTime }) {
  const playerOnFloor = useRef(false)
  const playerVelocity = useRef(new Vector3())
  const playerDirection = useRef(new Vector3())
  const playerCollider = useRef(new Capsule(new Vector3(0, 0.35, 0), new Vector3(0, 1, 0), 0.35))
  const { camera, scene } = useThree()
  const sphereIdx = useRef(0)
  const v1 = useRef(new Vector3())
  const v2 = useRef(new Vector3())
  const v3 = useRef(new Vector3())

  useEffect(() => {
    mouseTime && throwBall(camera, playerCollider.current, playerDirection.current, playerVelocity.current, sphereIdx.current++)
  })

  const spheres = useMemo(() => {
    const s = []
    const sphereGeometry = new IcosahedronGeometry(SPHERE_RADIUS, 5)
    const sphereMaterial = new MeshStandardMaterial()
    for (let i = 0; i < NUM_SPHERES; i++) {
      const sphere = new Mesh(sphereGeometry, sphereMaterial)
      sphere.castShadow = true

      scene.add(sphere)

      s.push({
        mesh: sphere,
        collider: new Sphere(new Vector3(0, -100, 0), SPHERE_RADIUS),
        velocity: new Vector3()
      })
    }
    return s
  }, [scene])

  function spheresCollisions(v1, v2, v3) {
    for (let i = 0, length = spheres.length; i < length; i++) {
      const s1 = spheres[i]

      for (let j = i + 1; j < length; j++) {
        const s2 = spheres[j]

        const d2 = s1.collider.center.distanceToSquared(s2.collider.center)
        const r = s1.collider.radius + s2.collider.radius
        const r2 = r * r

        if (d2 < r2) {
          const normal = v1.subVectors(s1.collider.center, s2.collider.center).normalize()
          const v4 = v2.copy(normal).multiplyScalar(normal.dot(s1.velocity))
          const v5 = v3.copy(normal).multiplyScalar(normal.dot(s2.velocity))

          s1.velocity.add(v5).sub(v4)
          s2.velocity.add(v4).sub(v5)

          const d = (r - Math.sqrt(d2)) / 2

          s1.collider.center.addScaledVector(normal, d)
          s2.collider.center.addScaledVector(normal, -d)
        }
      }
    }
  }

  function updateSpheres(delta, octree, v1, v2, v3, playerCollider, playerVelocity) {
    spheres.forEach((sphere) => {
      sphere.collider.center.addScaledVector(sphere.velocity, delta)

      const result = octree.sphereIntersect(sphere.collider)

      if (result) {
        sphere.velocity.addScaledVector(result.normal, -result.normal.dot(sphere.velocity) * 1.5)
        sphere.collider.center.add(result.normal.multiplyScalar(result.depth))
      } else {
        sphere.velocity.y -= GRAVITY * delta
      }

      const damping = Math.exp(-1.5 * delta) - 1
      sphere.velocity.addScaledVector(sphere.velocity, damping)

      playerSphereCollision(sphere, v1, v2, v3, playerCollider, playerVelocity)
    })

    spheresCollisions(v1, v2, v3)

    for (const sphere of spheres) {
      sphere.mesh.position.copy(sphere.collider.center)
    }
  }

  function playerSphereCollision(sphere, v1, v2, v3, playerCollider, playerVelocity) {
    const center = v1.addVectors(playerCollider.start, playerCollider.end).multiplyScalar(0.5)
    const sphere_center = sphere.collider.center
    const r = playerCollider.radius + sphere.collider.radius
    const r2 = r * r
    // approximation: player = 3 spheres
    for (const point of [playerCollider.start, playerCollider.end, center]) {
      const d2 = point.distanceToSquared(sphere_center)
      if (d2 < r2) {
        const normal = v1.subVectors(point, sphere_center).normalize()
        const v4 = v2.copy(normal).multiplyScalar(normal.dot(playerVelocity))
        const v5 = v3.copy(normal).multiplyScalar(normal.dot(sphere.velocity))
        playerVelocity.add(v5).sub(v4)
        sphere.velocity.add(v4).sub(v5)
        const d = (r - Math.sqrt(d2)) / 2
        sphere_center.addScaledVector(normal, -d)
      }
    }
  }

  const keyboard = useKeyboard()

  function getForwardVector(camera, playerDirection) {
    camera.getWorldDirection(playerDirection)
    playerDirection.y = 0
    playerDirection.normalize()
    return playerDirection
  }

  function getSideVector(camera, playerDirection) {
    camera.getWorldDirection(playerDirection)
    playerDirection.y = 0
    playerDirection.normalize()
    playerDirection.cross(camera.up)
    return playerDirection
  }

  function controls(camera, delta, playerVelocity, playerOnFloor, playerDirection) {
    const speedDelta = delta * (playerOnFloor ? 25 : 8)
    keyboard['KeyA'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(-speedDelta))
    keyboard['KeyD'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyW'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyS'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta))
    if (playerOnFloor) {
      if (keyboard['Space']) {
        playerVelocity.y = 15
      }
    }
  }

  function updatePlayer(camera, delta, octree, playerCollider, playerVelocity, playerOnFloor) {
    let damping = Math.exp(-4 * delta) - 1
    if (!playerOnFloor) {
      playerVelocity.y -= GRAVITY * delta
      damping *= 0.1 // small air resistance
    }
    playerVelocity.addScaledVector(playerVelocity, damping)
    const deltaPosition = playerVelocity.clone().multiplyScalar(delta)
    playerCollider.translate(deltaPosition)
    playerOnFloor = playerCollisions(playerCollider, octree, playerVelocity)
    camera.position.copy(playerCollider.end)
    return playerOnFloor
  }

  function throwBall(camera, playerCollider, playerDirection, playerVelocity, sphereIdx) {
    const sphere = spheres[sphereIdx % spheres.length]

    camera.getWorldDirection(playerDirection)

    sphere.collider.center.copy(playerCollider.end).addScaledVector(playerDirection, playerCollider.radius * 1.5)

    // throw the ball with more force if we hold the button longer, and if we move forward
    //const impulse = 15 + 30 * (1 - Math.exp((mouseTime - performance.now()) * 0.001))

    sphere.velocity.copy(playerDirection).multiplyScalar(50)
    sphere.velocity.addScaledVector(playerVelocity, 2)
  }

  function playerCollisions(playerCollider, octree, playerVelocity) {
    const result = octree.capsuleIntersect(playerCollider)
    let playerOnFloor = false
    if (result) {
      playerOnFloor = result.normal.y > 0
      if (!playerOnFloor) {
        playerVelocity.addScaledVector(result.normal, -result.normal.dot(playerVelocity))
      }
      playerCollider.translate(result.normal.multiplyScalar(result.depth))
    }
    return playerOnFloor
  }

  function teleportPlayerIfOob(camera, playerCollider, playerVelocity) {
    if (camera.position.y <= -100) {
      playerVelocity.set(0, 0, 0)
      playerCollider.start.set(0, 10.35, 0)
      playerCollider.end.set(0, 11, 0)
      playerCollider.radius = 0.35
      camera.position.copy(playerCollider.end)
      camera.rotation.set(0, 0, 0)
    }
  }

  useFrame(({ camera }, delta) => {
    controls(camera, delta, playerVelocity.current, playerOnFloor.current, playerDirection.current)
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      playerOnFloor.current = updatePlayer(camera, deltaSteps, worldOctree, playerCollider.current, playerVelocity.current, playerOnFloor.current)
      updateSpheres(deltaSteps, worldOctree, v1.current, v2.current, v3.current, playerCollider.current, playerVelocity.current)
    }
    teleportPlayerIfOob(camera, playerCollider.current, playerVelocity.current)
  })
}
