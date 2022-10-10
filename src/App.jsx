import { Stats, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import { Environment } from '@react-three/drei'

const MODELS = {
  Hammer: './models/hammer.glb',
  Drill: './models/drill.glb',
  'Tape Measure': './models/tapeMeasure.glb'
}

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} dispose={null} />
}

export default function App() {
  const { model } = useControls({
    model: {
      value: 'Hammer',
      options: Object.keys(MODELS)
    }
  })

  return (
    <>
      <Canvas camera={{ position: [0, 0, -0.2], near: 0.05 }}>
        <Environment files="./img/workshop_1k.hdr" background />
        <Model url={MODELS[model]} />
        <OrbitControls />
        <Stats />
      </Canvas>
      <Leva />
      <span id="info">The {model.toLowerCase()} is selected.</span>
    </>
  )
}
