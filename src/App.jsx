import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Vector3, TextureLoader } from 'three'
import { Stats, Environment } from '@react-three/drei'
import Bolt from './Bolt'
import Floor from './Floor'
import Monkey from './Monkey'

function Rig() {
  const { camera, mouse } = useThree()
  const vec = new Vector3()
  return useFrame(() => {
    camera.position.lerp(
      vec.set(mouse.x * 2, mouse.y * 2, camera.position.z),
      0.05
    )
    camera.lookAt(0, 0, 0)
  })
}

export default function App() {
  // const normalMap = useLoader(
  //   TextureLoader,
  //   './img/metal_grate_rusty_arm_1k.png'
  // )

  return (
    <Canvas camera={{ position: [0, 0, 10] }} shadows>
      <Environment preset="warehouse" background />
      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      {/* <mesh position={[0, 0, -.1]} receiveShadow>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial />
      </mesh> */}
      {/* <Floor />
      {[...Array(20)].map((_, x) =>
        [...Array(20)].map((_, y) => (
          <Bolt
            key={x + y * 10}
            position={[x * 2.5 - 20, y * 2.5 - 20, 0]}
            scale={[50, 50, 50]}
          />
        ))
      )} */}
      <Monkey />
      <Rig />
      <Stats />
    </Canvas>
  )
}
