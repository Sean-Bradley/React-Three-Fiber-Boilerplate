import { Canvas, useFrame } from '@react-three/fiber'
import { create } from 'zustand'

const useStore = create((set) => ({
  position: [0, 1, 10],
  setPosition: (position) => set({ position })
}))

export default function App() {
  const setPosition = useStore((state) => state.setPosition)
  return (
    <>
      <Canvas>
        <MyCameraReactsToStateChanges />
        <gridHelper />
      </Canvas>
      <button id="button0" onClick={() => setPosition([0, 7, 0])}>click me</button>
      <button id="button1" onClick={() => setPosition([0, 1, 10])}>click me</button>
    </>
  )
}

function MyCameraReactsToStateChanges() {
  const [x, y, z] = useStore((state) => state.position)
  useFrame(({ camera }) => {
    camera.position.lerp({ x, y, z }, 0.1)
    camera.lookAt(0, 0, 0)
  })
}
