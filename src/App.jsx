import { useMemo } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'

export default function App() {
  const options = useMemo(() => {
    return {
      positionX: { value: 4, min: 0, max: 10, step: 0.1 },
      rotationX: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      scaleX: { value: 1, min: 0, max: 2, step: 0.1 }
    }
  }, [])

  const redBall = useControls('Red', options)
  const blueBall = useControls('Blue', options)
  const greenBall = useControls('Green', options)

  return (
    <>
      <Canvas camera={{ position: [1, 2, 3] }}>
        <directionalLight position={(1, 1, 1)} />
        <mesh position-x={redBall.positionX} rotation-x={redBall.rotationX} scale={redBall.scaleX}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={'red'} flatShading />
          <axesHelper args={[5]} />
          <mesh position-x={blueBall.positionX} rotation-x={blueBall.rotationX} scale={blueBall.scaleX}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color={'blue'} flatShading />
            <axesHelper args={[5]} />
            <mesh position-x={greenBall.positionX} rotation-x={greenBall.rotationX} scale={greenBall.scaleX}>
              <icosahedronGeometry args={[1, 1]} />
              <meshStandardMaterial color={'green'} flatShading />
              <axesHelper args={[5]} />
            </mesh>
          </mesh>
        </mesh>
        <OrbitControls target-x={9} />
      </Canvas>
      <Leva />
    </>
  )
}
