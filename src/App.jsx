import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Environment, useGLTF, Clone } from '@react-three/drei'
import { Leva, useControls } from 'leva'

const Models = [
  { title: 'Hammer', url: './models/hammer.glb' },
  { title: 'Drill', url: './models/drill.glb' },
  { title: 'Tape Measure', url: './models/tapeMeasure.glb' }
]

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <Clone object={scene} />
}

export default function App() {
  const { title } = useControls({
    title: {
      options: Models.map(({ title }) => title)
    }
  })

  return (
    <>
      <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
        <Environment files="./img/workshop_1k.hdr" background />
        <Suspense>
          <Model url={Models[Models.findIndex((m) => m.title === title)].url} />
        </Suspense>
        <OrbitControls autoRotate />
        <Stats />
      </Canvas>
      <Leva />
      <span id="info">The {title} is selected.</span>
    </>
  )
}

//useGLTF.preload(Models.map(({ url }) => url))
