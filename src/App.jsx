import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { Stats, Environment, Center } from '@react-three/drei'
import Button from './Button'

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
  return (
    <Canvas camera={{ position: [0, 0, 5] }} shadows>
      <Environment preset="forest" background />
      <Center>
        {[...Array(5).keys()].map((x) =>
          [...Array(3).keys()].map((y) => (
            <Button key={x + y * 5} position={[x * 2.5, y * 2.5, 0]} />
          ))
        )}
      </Center>
      <Rig />
      <Stats />
    </Canvas>
  )
}
