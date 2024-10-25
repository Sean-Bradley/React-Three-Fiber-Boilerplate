import { useEffect } from 'react'
import { Canvas, useFrame, useThree, useLoader  } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { BackSide, TextureLoader } from 'three'
import { create } from 'zustand'
import JEASINGS from "jeasings"

const useStore = create((set) => ({
  position: [50, 80, 50],
  fov: 135,
  setParameters: (position, fov) => {
    set({ position })
    set({ fov })
  }
}))

function Sphere() {
  const texture = useLoader(TextureLoader, '/img/vignaioli_night_2k.jpg')

  return (
    <>
      <mesh>
        <sphereGeometry args={[100, 128, 128]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>
    </>
  )
}

function JEasings() {
  useFrame(() => {
    JEASINGS.update()
  })
}

function Camera() {
  const { camera } = useThree()
  const [x, y, z] = useStore((state) => state.position)
  const fov = useStore((state) => state.fov)

  useEffect(() => {
    new JEASINGS.JEasing(camera.position)
      .to(
        {
          x: x,
          y: y,
          z: z
        },
        1000
      )
      .easing(JEASINGS.Quadratic.InOut)
      .start()
    new JEASINGS.JEasing(camera)
      .to(
        {
          fov: fov
        },
        1000
      )
      .start()
      .easing(JEASINGS.Quadratic.InOut)
      .onUpdate(() => camera.updateProjectionMatrix())
  }, [x, y, z, fov])
}

export default function App() {
  const { position, fov } = useStore((state) => state)
  const setParameters = useStore((state) => state.setParameters)

  return (
    <>
      <Canvas camera={{ position, fov }}>
        <Sphere />
        <Camera />
        <OrbitControls enablePan={false} enableZoom={false} />
        <JEasings />
        <Stats />
      </Canvas>
      <button id="button0" onClick={() => setParameters([50, 80, 50], 135)}>
        Fisheye
      </button>
      <button id="button1" onClick={() => setParameters([0, 0, 10], 70)}>
        Panorama
      </button>
    </>
  )
}
