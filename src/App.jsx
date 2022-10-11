import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { Leva, useControls } from 'leva'

const MODELS = {
  hammer: './models/hammer.glb',
  drill: './models/drill.glb',
  tapeMeasure: './models/tapeMeasure.glb'
}

function Model(props) {
  const { scene } = useGLTF(props.url)
  return <primitive object={scene} />
}

export default function App() {
  const dropDown = useControls({
    model: {
      value: 'hammer',
      options: Object.keys(MODELS)
    }
  })

  return (
    <>
      <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
        <Environment files="./img/workshop_1k.hdr" background />
        <group>
          <Model url={MODELS[dropDown.model]} />
        </group>
        <OrbitControls autoRotate />
      </Canvas>
      <Leva />
      <span id="info">The {dropDown.model.replace(/([A-Z])/g, ' $1').toLowerCase()} is selected.</span>
    </>
  )
}
