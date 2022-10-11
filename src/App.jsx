import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Stats, Html } from '@react-three/drei'
import { Leva, useControls } from 'leva'

const MODELS = {
  hammer: './models/hammer.glb',
  drill: './models/drill.glb',
  tapeMeasure: './models/tapeMeasure.glb'
}

const cache = {}

function Model(props) {
  const { scene } = useGLTF(props.url)

  if (!cache[props.url]) {
    console.log('Caching ' + props.url)
    const annotations = []

    scene.traverse((o) => {
      if (o.userData.prop) {
        annotations.push(
          <Html key={o.uuid} position={[o.position.x, o.position.y, o.position.z]} distanceFactor={0.25}>
            <div className="annotation">{o.userData.prop}</div>
          </Html>
        )
      }
    })

    cache[props.url] = (
      <primitive object={scene}>
        {annotations.map((a) => {
          return a
        })}
      </primitive>
    )
  }
  return cache[props.url]
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
        <Stats />
      </Canvas>
      <Leva />
      <span id="info">The {dropDown.model.replace(/([A-Z])/g, ' $1').toLowerCase()} is selected.</span>
    </>
  )
}
