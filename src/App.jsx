import { Canvas } from '@react-three/fiber'
import { Stats, Environment } from '@react-three/drei'
import Scene from './Scene'
import Teleport from './Teleport'
import { create } from 'zustand'
import { Vector3 } from 'three'

export const useStore = create((set) => ({
  to: new Vector3(0, 1, 10),
  orbitmode: false,
  setOrbitmode: (v) => set({ orbitmode: v }),
  autoRotate: false,
  setAutoRotate: (v) => set({ autoRotate: v })
}))

export default function App() {
  return (
    <Canvas>
      <Teleport />
      <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
      <Scene />
      <Stats />
    </Canvas>
  )
}
