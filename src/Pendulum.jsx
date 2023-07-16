import { useSphere, useDistanceConstraint } from '@react-three/cannon'
import { useEffect } from 'react'

//https://pmndrs.github.io/cannon-es/examples/constraints

export default function Pendulum({ position, impulse }) {
  const [link0] = useSphere(() => ({
    args: [0.25],
    mass: 0,
    position: [position[0], position[1] + 3.5, position[2]]
  }))

  const [link1] = useSphere(() => ({
    args: [0.25],
    mass: 1,
    position: [position[0], position[1] + 3, position[2]],
    angularFactor: [0, 0, 0]
  }))

  const [link2] = useSphere(() => ({
    args: [0.25],
    mass: 1,
    position: [position[0], position[1] + 2.5, position[2]],
    angularFactor: [0, 0, 0]
  }))

  const [link3] = useSphere(() => ({
    args: [0.25],
    mass: 1,
    position: [position[0], position[1] + 2, position[2]],
    angularFactor: [0, 0, 0]
  }))

  const [link4] = useSphere(() => ({
    args: [0.25],
    mass: 1,
    position: [position[0], position[1] + 1.5, position[2]],
    angularFactor: [0, 0, 0]
  }))

  const [link5, api] = useSphere(() => ({
    args: [0.5],
    mass: 10,
    position: [position[0], position[1] + 1, position[2]]
  }))

  useDistanceConstraint(link0, link1, {
    distance: 0.5
  })
  useDistanceConstraint(link1, link2, {
    distance: 0.5
  })
  useDistanceConstraint(link2, link3, {
    distance: 0.5
  })
  useDistanceConstraint(link3, link4, {
    distance: 0.5
  })
  useDistanceConstraint(link4, link5, {
    distance: 0.75
  })

  // useHingeConstraint(link0, link1, { pivotA: [0, -0.5, 0], axisA: [0, 0, 0] }) //, pivotB: [0, -0.5, 0], axisB: [0, 0, 0] })
  // useHingeConstraint(link1, link2, { pivotA: [0, -0.5, 0], axisA: [0, 0, 0] })
  // useHingeConstraint(link2, link3, { pivotA: [0, -0.5, 0], axisA: [0, 0, 0] })
  // useHingeConstraint(link3, link4, { pivotA: [0, -0.5, 0], axisA: [0, 0, 0] })
  // useHingeConstraint(link4, link5, { pivotA: [0, -0.5, 0], axisA: [0, 0, 0] })

  // usePointToPointConstraint(link0, link1, { pivotA: [0, -0.5, 0], pivotB: [0, 0, 0] })
  // usePointToPointConstraint(link1, link2, { pivotA: [0, -0.5, 0], pivotB: [0, 0, 0] })
  // usePointToPointConstraint(link2, link3, { pivotA: [0, -0.5, 0], pivotB: [0, 0, 0] })
  // usePointToPointConstraint(link3, link4, { pivotA: [0, -0.5, 0], pivotB: [0, 0, 0] })
  // usePointToPointConstraint(link4, link5, { pivotA: [0, -0.5, 0], pivotB: [0, 0, 0] })

  useEffect(() => {
    api.applyImpulse(impulse, [0, 0, 0]) //start it right away

    const interval = setInterval(() => {
      api.applyImpulse(impulse, [0, 0, 0])
    }, 3000)
    return () => clearInterval(interval)
  }, [api, impulse])

  return (
    <group>
      <group ref={link0}>
        <mesh scale={[1.2, 1.2, 1.2]} rotation-y={Math.PI / 1.7}>
          <torusGeometry args={[0.25, 0.025, 8, 12]} />
          <meshStandardMaterial />
        </mesh>
      </group>
      <group ref={link1}>
        <mesh scale={[1.2, 1.2, 1.2]} rotation-y={Math.PI / 2.3}>
          <torusGeometry args={[0.25, 0.025, 8, 12]} />
          <meshStandardMaterial />
        </mesh>
      </group>
      <group ref={link2}>
        <mesh scale={[1.2, 1.2, 1.2]} rotation-y={Math.PI / 1.7}>
          <torusGeometry args={[0.25, 0.025, 8, 12]} />
          <meshStandardMaterial />
        </mesh>
      </group>
      <group ref={link3}>
        <mesh scale={[1.2, 1.2, 1.2]} rotation-y={Math.PI / 2.3}>
          <torusGeometry args={[0.25, 0.025, 8, 12]} />
          <meshStandardMaterial />
        </mesh>
      </group>
      <group ref={link4}>
        <mesh scale={[1.2, 1.2, 1.2]} rotation-y={Math.PI / 1.7}>
          <torusGeometry args={[0.25, 0.025, 8, 12]} />
          <meshStandardMaterial />
        </mesh>
      </group>
      <group ref={link5}>
        <mesh>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial />
        </mesh>
      </group>
    </group>
  )
}
