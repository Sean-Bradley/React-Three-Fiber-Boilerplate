import { useRef, useMemo, useEffect } from 'react'
import { Capsule } from 'three/examples/jsm/math/Capsule.js'
import { Vector3, IcosahedronGeometry, MeshLambertMaterial, Mesh, Sphere } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import useKeyboard from './useKeyboard'

export default function Player({ worldOctree, mouseTime }) {
  const GRAVITY = 30
  const STEPS_PER_FRAME = 5
  const NUM_SPHERES = 100
  const SPHERE_RADIUS = 0.2
  const playerOnFloor = useRef(false)
  const playerVelocity = useRef(new Vector3())
  const playerDirection = useRef(new Vector3())
  const playerCollider = useRef(new Capsule(new Vector3(0, 0.35, 0), new Vector3(0, 1, 0), 0.35))
  const state = useThree()
  const sphereIdx = useRef(0)
  const vector1 = useRef(new Vector3())
  const vector2 = useRef(new Vector3())
  const vector3 = useRef(new Vector3())

  useEffect(() => {
    mouseTime && throwBall()
  })

  const spheres = useMemo(() => {
    const s = []
    const sphereGeometry = new IcosahedronGeometry(SPHERE_RADIUS, 5)
    const sphereMaterial = new MeshLambertMaterial({ color: 0xbbbb44 })
    for (let i = 0; i < NUM_SPHERES; i++) {
      const sphere = new Mesh(sphereGeometry, sphereMaterial)
      sphere.castShadow = true

      state.scene.add(sphere)

      s.push({
        mesh: sphere,
        collider: new Sphere(new Vector3(0, -100, 0), SPHERE_RADIUS),
        velocity: new Vector3()
      })
    }
    return s
  }, [state.scene])

  function spheresCollisions() {
    for (let i = 0, length = spheres.length; i < length; i++) {
      const s1 = spheres[i]

      for (let j = i + 1; j < length; j++) {
        const s2 = spheres[j]

        const d2 = s1.collider.center.distanceToSquared(s2.collider.center)
        const r = s1.collider.radius + s2.collider.radius
        const r2 = r * r

        if (d2 < r2) {
          const normal = vector1.current.subVectors(s1.collider.center, s2.collider.center).normalize()
          const v1 = vector2.current.copy(normal).multiplyScalar(normal.dot(s1.velocity))
          const v2 = vector3.current.copy(normal).multiplyScalar(normal.dot(s2.velocity))

          s1.velocity.add(v2).sub(v1)
          s2.velocity.add(v1).sub(v2)

          const d = (r - Math.sqrt(d2)) / 2

          s1.collider.center.addScaledVector(normal, d)
          s2.collider.center.addScaledVector(normal, -d)
        }
      }
    }
  }

  function updateSpheres(state, delta) {
    spheres.forEach((sphere) => {
      sphere.collider.center.addScaledVector(sphere.velocity, delta)

      const result = worldOctree.sphereIntersect(sphere.collider)

      if (result) {
        sphere.velocity.addScaledVector(result.normal, -result.normal.dot(sphere.velocity) * 1.5)
        sphere.collider.center.add(result.normal.multiplyScalar(result.depth))
      } else {
        sphere.velocity.y -= GRAVITY * delta
      }

      const damping = Math.exp(-1.5 * delta) - 1
      sphere.velocity.addScaledVector(sphere.velocity, damping)

      playerSphereCollision(sphere)
    })

    spheresCollisions()

    for (const sphere of spheres) {
      sphere.mesh.position.copy(sphere.collider.center)
    }
  }

  function playerSphereCollision(sphere) {
    const center = vector1.current
      .addVectors(playerCollider.current.start, playerCollider.current.end)
      .multiplyScalar(0.5)
    const sphere_center = sphere.collider.center
    const r = playerCollider.current.radius + sphere.collider.radius
    const r2 = r * r
    // approximation: player = 3 spheres
    for (const point of [playerCollider.current.start, playerCollider.current.end, center]) {
      const d2 = point.distanceToSquared(sphere_center)
      if (d2 < r2) {
        const normal = vector1.current.subVectors(point, sphere_center).normalize()
        const v1 = vector2.current.copy(normal).multiplyScalar(normal.dot(playerVelocity.current))
        const v2 = vector3.current.copy(normal).multiplyScalar(normal.dot(sphere.velocity))
        playerVelocity.current.add(v2).sub(v1)
        sphere.velocity.add(v1).sub(v2)
        const d = (r - Math.sqrt(d2)) / 2
        sphere_center.addScaledVector(normal, -d)
      }
    }
  }

  const keyboard = useKeyboard()

  function getForwardVector(state) {
    state.camera.getWorldDirection(playerDirection.current)
    playerDirection.current.y = 0
    playerDirection.current.normalize()
    return playerDirection.current
  }

  function getSideVector(state) {
    state.camera.getWorldDirection(playerDirection.current)
    playerDirection.current.y = 0
    playerDirection.current.normalize()
    playerDirection.current.cross(state.camera.up)
    return playerDirection.current
  }

  function controls(state, delta) {
    const speedDelta = delta * (playerOnFloor.current ? 25 : 8)
    keyboard['a'] && playerVelocity.current.add(getSideVector(state).multiplyScalar(-speedDelta))
    keyboard['d'] && playerVelocity.current.add(getSideVector(state).multiplyScalar(speedDelta))
    keyboard['w'] && playerVelocity.current.add(getForwardVector(state).multiplyScalar(speedDelta))
    keyboard['s'] && playerVelocity.current.add(getForwardVector(state).multiplyScalar(-speedDelta))
    if (playerOnFloor.current) {
      if (keyboard[' ']) {
        playerVelocity.current.y = 15
      }
    }
  }

  function updatePlayer(state, delta) {
    let damping = Math.exp(-4 * delta) - 1
    if (!playerOnFloor.current) {
      playerVelocity.current.y -= GRAVITY * delta
      damping *= 0.1 // small air resistance
    }
    playerVelocity.current.addScaledVector(playerVelocity.current, damping)
    const deltaPosition = playerVelocity.current.clone().multiplyScalar(delta)
    playerCollider.current.translate(deltaPosition)
    playerCollisions()
    state.camera.position.copy(playerCollider.current.end)
  }

  function throwBall() {
    const sphere = spheres[sphereIdx.current]

    state.camera.getWorldDirection(playerDirection.current)

    sphere.collider.center
      .copy(playerCollider.current.end)
      .addScaledVector(playerDirection.current, playerCollider.current.radius * 1.5)

    // throw the ball with more force if we hold the button longer, and if we move forward
    const impulse = 15 + 30 * (1 - Math.exp((mouseTime - performance.now()) * 0.001))

    sphere.velocity.copy(playerDirection.current).multiplyScalar(impulse)
    sphere.velocity.addScaledVector(playerVelocity.current, 2)

    sphereIdx.current = (sphereIdx.current + 1) % spheres.length
  }

  function playerCollisions() {
    const result = worldOctree.capsuleIntersect(playerCollider.current)
    playerOnFloor.current = false
    if (result) {
      playerOnFloor.current = result.normal.y > 0
      if (!playerOnFloor.current) {
        playerVelocity.current.addScaledVector(result.normal, -result.normal.dot(playerVelocity.current))
      }
      playerCollider.current.translate(result.normal.multiplyScalar(result.depth))
    }
  }

  useFrame((state, delta) => {
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      controls(state, deltaSteps)
      updatePlayer(state, deltaSteps)
      updateSpheres(state, deltaSteps)
    }
  })

  //   return (
  //     <></>
  //     //     ...Array(NUM_SPHERES)
  //     //       .keys()
  //     //       .map((x) => <Sphere />)
  //   )
}
