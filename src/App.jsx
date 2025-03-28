import { Stats, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { Debug, Physics, useBox, usePlane, useSphere, useTrimesh, useCylinder, useConvexPolyhedron } from '@react-three/cannon'
import { MeshNormalMaterial, IcosahedronGeometry, TorusKnotGeometry } from 'three'
import { Leva, useControls } from 'leva'
import CannonUtils from './CannonUtils'
import monkey from './models/monkey.glb'

function Plane(props) {
  const [ref] = usePlane(() => ({ mass: 0, ...props }), useRef())
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial />
    </mesh>
  )
}

function Box(props) {
  const [ref, api] = useBox(() => ({ args: [1, 1, 1], mass: 1, ...props }), useRef())

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

function Sphere(props) {
  const [ref, api] = useSphere(() => ({ args: [0.75], mass: 1, ...props }), useRef())

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <sphereGeometry args={[0.75]} />
      <meshNormalMaterial />
    </mesh>
  )
}

function Cylinder(props) {
  const [ref, api] = useCylinder(() => ({ args: [1, 1, 2, 8], mass: 1, ...props }), useRef())

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <cylinderGeometry args={[1, 1, 2, 8]} />
      <meshNormalMaterial />
    </mesh>
  )
}

function Icosahedron(props) {
  const geometry = useMemo(() => new IcosahedronGeometry(1, 0), [])
  const args = useMemo(() => CannonUtils.toConvexPolyhedronProps(geometry), [geometry])
  const [ref, api] = useConvexPolyhedron(() => ({ args, mass: 1, ...props }), useRef())

  return (
    <mesh ref={ref} castShadow geometry={geometry} onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <meshNormalMaterial />
    </mesh>
  )
}

function TorusKnot(props) {
  const geometry = useMemo(() => new TorusKnotGeometry(), [])
  const [ref, api] = useTrimesh(
    () => ({
      args: [geometry.attributes.position.array, geometry.index.array],
      mass: 1,
      ...props
    }),
    useRef()
  )

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <torusKnotGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

export function Monkey(props) {
  const { nodes } = useGLTF(monkey)
  const [ref, api] = useTrimesh(
    () => ({
      args: [nodes.Suzanne.geometry.attributes.position.array, nodes.Suzanne.geometry.index.array],
      mass: 1,
      ...props
    }),
    useRef()
  )
  return (
    <group ref={ref} {...props} dispose={null} onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <mesh castShadow geometry={nodes.Suzanne.geometry} material={useMemo(() => new MeshNormalMaterial(), [])} />
    </group>
  )
}

export default function App() {
  const gravity = useControls('Gravity', {
    x: { value: 0, min: -10, max: 10, step: 0.1 },
    y: { value: -9.8, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 }
  })
  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 4] }}>
        <spotLight position={[2.5, 5, 5]} angle={Math.PI / 4} penumbra={0.5} castShadow intensity={Math.PI * 25} />
        <spotLight position={[-2.5, 5, 5]} angle={Math.PI / 4} penumbra={0.5} castShadow intensity={Math.PI * 25} />
        <Physics gravity={[gravity.x, gravity.y, gravity.z]}>
          <Debug>
            <Plane rotation={[-Math.PI / 2, 0, 0]} />
            <Box position={[-4, 3, 0]} />
            <Sphere position={[-2, 3, 0]} />
            <Cylinder position={[0, 3, 0]} />
            <Icosahedron position={[2, 3, 0]} />
            <TorusKnot position={[4, 3, 0]} />
            <Monkey position={[-2, 20, 0]} />
          </Debug>
        </Physics>
        <OrbitControls target-y={0.5} />
        <Stats />
      </Canvas>
      <Leva />
    </>
  )
}
