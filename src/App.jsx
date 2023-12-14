import { useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { GUI } from 'dat.gui'

function ObjectHierarchy() {
  const redRef = useRef()
  const blueRef = useRef()
  const greenRef = useRef()

  useEffect(() => {
    const gui = new GUI()

    const redFolder = gui.addFolder('Red')
    redFolder.add(redRef.current.position, 'x', 0, 10).name('Position.x')
    redFolder.add(redRef.current.rotation, 'x', 0, Math.PI * 2).name('Rotation.x')
    redFolder.add(redRef.current.scale, 'x', 0, 2, 0.01).name('Scale.x')
    redFolder.open()

    const blueFolder = gui.addFolder('Blue')
    blueFolder.add(blueRef.current.position, 'x', 0, 10).name('Position.x')
    blueFolder.add(blueRef.current.rotation, 'x', 0, Math.PI * 2).name('Rotation.x')
    blueFolder.add(blueRef.current.scale, 'x', 0, 2, 0.01).name('Scale.x')
    blueFolder.open()

    const greenFolder = gui.addFolder('Green')
    greenFolder.add(greenRef.current.position, 'x', 0, 10).name('Position.x')
    greenFolder.add(greenRef.current.rotation, 'x', 0, Math.PI * 2).name('Rotation.x')
    greenFolder.add(greenRef.current.scale, 'x', 0, 2, 0.01).name('Scale.x')
    greenFolder.open()

    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <mesh ref={redRef} position-x={4} rotation-x={0} scale={1}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color={'red'} flatShading />
      <axesHelper args={[5]} />
      <mesh ref={blueRef} position-x={4} rotation-x={0} scale={1}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={'blue'} flatShading />
        <axesHelper args={[5]} />
        <mesh ref={greenRef} position-x={4} rotation-x={0} scale={1}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={'green'} flatShading />
          <axesHelper args={[5]} />
        </mesh>
      </mesh>
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [1, 2, 3] }}>
      <directionalLight position={(1, 1, 1)} intensity={Math.PI} />
      <ObjectHierarchy />
      <OrbitControls target-x={9} />
    </Canvas>
  )
}