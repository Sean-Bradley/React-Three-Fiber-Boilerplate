import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Stats, Html } from '@react-three/drei'
import { useControls } from 'leva'
import Models from './models'

function Model({ url }) {
  const { scene } = useGLTF(url)
  const [cache, setCache] = useState({})

  if (!cache[url]) {
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

    console.log('Caching JSX for url ' + url)
    setCache({
      ...cache,
      [url]: <primitive object={scene}>{annotations}</primitive>
    })
  }
  return cache[url]
}

export default function App() {
  const { model } = useControls({
    model: {
      value: 'ambulance',
      options: Object.keys(Models)
    }
  })

  return (
    <>
      <Canvas camera={{ position: [0, 1, 3] }}>
        <Environment files="./img/workshop_1k.hdr" background blur={0.5} />
        <group>
          <Model url={Models[model]} />
        </group>
        <OrbitControls target={[0, 1, 0]} />
        <Stats />
      </Canvas>
      <span id="info">The {model.replace(/([A-Z])/g, ' $1').toLowerCase()} is selected.</span>
    </>
  )
}
