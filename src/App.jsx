import { Stats, OrbitControls, Environment, Text } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { useControls } from 'leva'
import { TextureLoader } from 'three'
import { Model } from './Test'
import { Perf } from 'r3f-perf'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

export default function App() {
  const { focusDistance, focalLength, bokehScale } = useControls({
    focusDistance: {
      min: 0,
      max: 4,
      value: 2
    },
    focalLength: {
      min: 0,
      max: 1,
      value: 0.1
    },
    bokehScale: {
      min: 0,
      max: 10,
      value: 2
    }
  })
  return (
    <Canvas camera={{ position: [0, 0, 2], far: 100000 }} gl={{ logarithmicDepthBuffer: true }}>
      <Perf position="top-left" />
      <Environment
        // preset="sunset"
        files="./img/industrial_sunset_02_1k.hdr"
        background
      />
      <Model />
      <OrbitControls />
      <EffectComposer>
        <DepthOfField focusDistance={focusDistance} focalLength={focalLength} bokehScale={bokehScale} />
      </EffectComposer>
    </Canvas>
  )
}

// export default function App() {
//   // const xRef = useRef()
//   const texture = useLoader(TextureLoader, './img/grid.png')

//   const rotation = useControls({
//     x: {
//       value: 0,
//       min: 0,
//       max: Math.PI,
//       step: 0.001
//     },
//     y: {
//       value: 0,
//       min: 0,
//       max: Math.PI,
//       step: 0.001
//     },
//     z: {
//       value: 0,
//       min: 0,
//       max: Math.PI,
//       step: 0.001
//     }
//   })

//   return (
//     <Canvas camera={{ position: [0, 0, 2] }}>
//       <group rotation-z={rotation.x}>
//         <mesh>
//           <sphereGeometry />
//           <meshNormalMaterial wireframe={true} />
//         </mesh>
//         <mesh rotation-x={-Math.PI / 2}>
//           <cylinderGeometry args={[0.025, 0.025, 2]} />
//           <meshNormalMaterial />
//         </mesh>
//         <mesh>
//           <cylinderGeometry args={[0.025, 0.025, 2]} />
//           <meshNormalMaterial />
//         </mesh>
//         <mesh rotation-z={-Math.PI / 2}>
//           <cylinderGeometry args={[0.025, 0.025, 2]} />
//           <meshNormalMaterial />
//         </mesh>
//         <Text position-z={1.01}>x</Text>
//         <Text position-z={-1.01}>x</Text>
//         <Text position-y={1.01} rotation-x={-Math.PI / 2}>
//           y
//         </Text>
//         <Text position-y={-1.01} rotation-x={Math.PI / 2}>
//           y
//         </Text>
//         <Text position-x={1.01} rotation-y={Math.PI / 2}>
//           z
//         </Text>
//         <Text position-x={-1.01} rotation-y={-Math.PI / 2}>
//           z
//         </Text>
//       </group>

//       <OrbitControls />
//       <Stats />
//     </Canvas>
//   )
// }
