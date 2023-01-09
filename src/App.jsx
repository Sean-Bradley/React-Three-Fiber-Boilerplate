import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Sphere } from '@react-three/drei'
import Room from './Room'
import ArmChair from './ArmChair'
import { useRef, useState } from 'react'
import { Vector3 } from 'three'
import { useMemo } from 'react'

// function Animate({ lerping, to }) {
//   useFrame(({ camera }, delta) => {
//     if (lerping) {
//       camera.position.lerp(to, delta * 2)
//     }
//   })
// }

function Teleport({ controls, lerping, setLerping }) {
  const ref = useRef()
  const axesHelperRef = useRef()
  const { camera } = useThree()

  const [to, setTo] = useState(new Vector3(2.25, 1, 2.25))
  const [target, setTarget] = useState(new Vector3(0, 1, 0))
  //const v = useMemo(() => new Vector3(), [])

  useFrame(({ camera }, delta) => {
    lerping && camera.position.lerp(to, delta * 2)

    if (lerping) {
      //v.set
      //update carrunt target
      //console.log(controls.current.target)
      controls.current.target.lerp(target, 0.8)
    }
    //controls.current.target.lerp(target, delta * 2) &&
    axesHelperRef.current.position.x = controls.current.target.x
    axesHelperRef.current.position.y = controls.current.target.y
    axesHelperRef.current.position.z = controls.current.target.z
  })

  return (
    <>
      <mesh
        rotation-x={-Math.PI / 2}
        position={[2.5, 0.31, 2.5]}
        onPointerMove={({ point }) => {
          ref.current.position.z = point.z
          ref.current.position.x = point.x
        }}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial wireframe={true} />
      </mesh>
      <mesh
        ref={ref}
        rotation-x={-Math.PI / 2}
        position-y={0.32}
        onDoubleClick={({ point }) => {
          controls.current.enabled = false
          const v = new Vector3(point.x, 1, point.z)
          setTo(v)
          //console.log(v.sub(camera.position))
          setTarget(v)//.sub(controls.current.target))
          setLerping(true)
        }}>
        <circleGeometry args={[0.2]} />
        <meshBasicMaterial color={'green'} />
      </mesh>
      <axesHelper ref={axesHelperRef} />
      {/* <Animate lerping={lerping} to={to} /> */}
    </>
  )
}

export default function App() {
  const ref = useRef()
  const [lerping, setLerping] = useState(false)
  return (
    <Canvas
      shadows
      camera={{ position: [2.25, 1, 2.25] }}
      onPointerDown={() => {
        ref.current.enabled = true
        setLerping(false)
      }}>
      <Environment
        preset="forest"
        background
        ground={{
          height: 2,
          radius: 115,
          scale: 100
        }}
      />
      <directionalLight position={[5, 1.5, 3]} intensity={2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-bias={-0.0001} />
      <Room />
      <ArmChair />
      <OrbitControls ref={ref} target={[1.5, 0.8, 1.5]} minPolarAngle={0} maxPolarAngle={Math.PI / 2 + Math.PI / 12} />
      <Teleport controls={ref} lerping={lerping} setLerping={setLerping} />
    </Canvas>
  )
}
