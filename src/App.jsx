import { Suspense } from 'react'
import { Box, OrbitControls, Torus } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody, Debug, CuboidCollider } from '@react-three/rapier'

function Diorama() {
  return (
    <Physics>
      <RigidBody>
        <Box position={[0, 2, .5]}>
          <meshNormalMaterial />
        </Box>
      </RigidBody>
      <RigidBody>
        <Box position={[.5, 4, 0]}>
          <meshNormalMaterial />
        </Box>
      </RigidBody>
      <RigidBody>
        <Box position={[0, 6, -.5]}>
          <meshNormalMaterial />
        </Box>
      </RigidBody>
      <RigidBody>
        <Box position={[-.5, 8, 0]}>
          <meshNormalMaterial />
        </Box>
      </RigidBody>
      
      <CuboidCollider args={[10, 0.5, 10]}>
        <Box args={[20, 1, 20]}>
          <meshNormalMaterial />
        </Box>
      </CuboidCollider>

      <Debug />
    </Physics>
  )
}

//useFrame(() => {})
export default function App() {
  return (
    <Canvas camera={{ position: [10, 10, 10] }}>
      <Suspense>
        <Diorama />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}
