import { Stats, OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useControls, button } from 'leva'
import { Vector3 } from 'three'
import annotations from './annotations.json'
import { create } from 'zustand'

export const useStore = create((set) => ({
  to: new Vector3(10, 10, 10),
  target: new Vector3(0, 1, 0),
  lerping: false,
  setLerping: (v) => set({ lerping: v })
}))

function Arena({ controls }) {
  const { nodes, materials } = useGLTF('./models/collision-world.glb')
  const { to, target, lerping, setLerping } = useStore((state) => state)

  useControls('Camera', () => {
    console.log('creating buttons')

    // using forEach
    // const _buttons = {}
    // annotations.forEach(({ title, position, lookAt }) => {
    //   _buttons[title] = button(() => {
    //     to.copy(position)
    //     target.copy(lookAt)
    //     setLerping(true)
    //   })
    // })
    // return _buttons

    // using reduce
    const _buttons = annotations.reduce(
      (acc, { title, position, lookAt }) =>
        Object.assign(acc, {
          [title]: button(() => {
            to.copy(position)
            target.copy(lookAt)
            setLerping(true)
          })
        }),
      {}
    )
    return _buttons
  })

  useFrame(({ camera }, delta) => {
    if (lerping) {
      camera.position.lerp(to, delta)
      controls.current.target.lerp(target, delta)
    }
  })

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Cube004.geometry}
        material={materials['Material.001']}
        position={[7.68, -5.59, 26.38]}
        scale={0.5}
        castShadow
        receiveShadow
        material-envMapIntensity={0.4}
        onDoubleClick={({ camera, intersections }) => {
          to.copy(camera.position)
          target.copy(intersections[0].point)
          setLerping(true)
        }}
      />
    </group>
  )
}

export default function App() {
  const ref = useRef()
  const { setLerping } = useStore((state) => state)

  return (
    <Canvas
      camera={{ position: [10, 10, 10] }}
      onPointerDown={() => setLerping(false)}
      onWheel={() => setLerping(false)}
      shadows>
      <directionalLight
        intensity={1}
        castShadow={true}
        shadow-bias={-0.0002}
        shadow-mapSize={[2048, 2048]}
        position={[85.0, 80.0, 70.0]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <Environment files="./img/drakensberg_solitary_mountain_1k.hdr" background />
      <OrbitControls ref={ref} target={[0, 1, 0]} />
      <Arena controls={ref} />
      <Stats />
    </Canvas>
  )
}
