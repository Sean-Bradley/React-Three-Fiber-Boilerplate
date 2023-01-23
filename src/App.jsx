import { Canvas } from '@react-three/fiber'
import { Stats, Environment } from '@react-three/drei'
import Model from './Scene'
import Teleport from './Teleport'

export default function App() {
  return (
    <Canvas>
      <Teleport />
      <Environment files="./img/rustig_koppie_puresky_1k.hdr" background />
      <Model />
      <Stats />
    </Canvas>
  )
}
