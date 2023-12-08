import { useRef, useMemo } from 'react'
import { Stats, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Debug, Physics, useSphere, usePlane, useTrimesh, useContactMaterial } from '@react-three/cannon'
import { TorusGeometry } from 'three'

const numBalls = 100

function Plane(props) {
  const [ref] = usePlane(() => ({ material: 'ground', ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial />
    </mesh>
  )
}

function TorusKnot({ args, ...props }) {
  const geometry = useMemo(() => new TorusGeometry(...args), [args])
  const [ref] = useTrimesh(() => ({
    args: [geometry.attributes.position.array, geometry.index.array],
    material: 'ring',
    ...props
  }))

  return (
    <mesh ref={ref} castShadow>
      <torusGeometry args={args} />
      <meshStandardMaterial />
    </mesh>
  )
}

function InstancedSpheres() {
  const count = useRef(0)
  const lastTime = useRef(0)

  const [ref, { at }] = useSphere(() => ({
    args: [0.25],
    mass: 1,
    position: [Math.random() - 0.5 * 2, Math.random() - 1000, Math.random() - 0.5 * 2],
    material: 'bouncy'
  }))

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    if (time - lastTime.current > 0.25) {
      const id = (count.current += 1) % numBalls
      at(id).velocity.set(0, 0, 0)
      at(id).angularVelocity.set(0, 0, 0)
      at(id).position.set(Math.random() - 0.5 * 2, Math.random() * 2 + 5, Math.random() - 0.5 * 2)
      lastTime.current = time
    }
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, numBalls]} castShadow frustumCulled={false}>
      <sphereGeometry args={[0.25]} />
      <meshStandardMaterial />
    </instancedMesh>
  )
}

function ContactMaterials() {
  useContactMaterial('ground', 'bouncy', {
    restitution: 0.5
  })
  useContactMaterial('ring', 'bouncy', {
    restitution: 0.45
  })
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [1.5, 2, 2] }}>
      <spotLight position={[2.5, 5, 5]} intensity={Math.PI * 25} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} />
      <spotLight position={[-2.5, 5, 5]} intensity={Math.PI * 25} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} />
      <Physics>
        <ContactMaterials />
        <Debug color={0x004400}>
          <Plane rotation={[-Math.PI / 2, 0, 0]} />
          <TorusKnot args={[0.75, 0.1]} position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        </Debug>
        <InstancedSpheres />
      </Physics>
      <OrbitControls target-y={1} />
      <Stats />
    </Canvas>
  )
}
