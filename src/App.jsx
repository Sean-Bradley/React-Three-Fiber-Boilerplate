import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useControls } from 'leva'
import PolyHedron from './PolyHedron'

export default function App() {
  const { nodes } = useGLTF('/models/suzanne.glb')
  const {
    autoRotate,
    mipmapBlur,
    luminanceThreshold,
    luminanceSmoothing,
    intensity
  } = useControls({
    autoRotate: !0,
    mipmapBlur: !0,
    luminanceThreshold: { value: 0.5, min: 0, max: 2, step: 0.01 },
    luminanceSmoothing: { value: 0.025, min: 0, max: 1, step: 0.001 },
    intensity: { value: 2, min: 0, max: 5, step: 0.01 }
  })

  return (
    <Canvas shadows camera={{ position: [-2, 2, 3] }}>
      <Environment files="/img/venice_sunset_1k.hdr.jpg" />
      <PolyHedron position={[0, 0, 2]} color={'hotpink'}>
        <sphereGeometry />
      </PolyHedron>
      <PolyHedron position={[-2, 0, 0]} color={'#ff9100'}>
        <icosahedronGeometry />
      </PolyHedron>
      <PolyHedron
        position={[0, 0, -2]}
        geometry={nodes.Suzanne.geometry}
        color={'skyblue'}
      />
      <PolyHedron position={[2, 0, 0]} color={'lime'}>
        <dodecahedronGeometry />
      </PolyHedron>
      <OrbitControls autoRotate={autoRotate} />
      <EffectComposer>
        <Bloom
          mipmapBlur={mipmapBlur}
          luminanceThreshold={luminanceThreshold}
          luminanceSmoothing={luminanceSmoothing}
          intensity={intensity}
        />
      </EffectComposer>
      <Stats />
    </Canvas>
  )
}
