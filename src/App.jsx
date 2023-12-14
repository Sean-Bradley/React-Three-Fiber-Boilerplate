import { Canvas } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Stats, OrbitControls, Environment, Bounds, useBounds } from '@react-three/drei'
import { GUI } from 'dat.gui'
import { OctahedronGeometry, Vector3, MathUtils } from 'three'

function Squircle() {
  const ref = useRef()
  const bounds = useBounds()
  const data = { n: 2 }

  function generateSquircle(n) {
    const g = new OctahedronGeometry(1, 16)
    const p = g.attributes.position.array

    for (let i = 0; i < p.length; i += 3) {
      const v = new Vector3(p[i], p[i + 1], p[i + 2])
      v.x = Math.tanh(v.x)
      v.y = Math.tanh(v.y)
      v.z = Math.tanh(v.z)
      p[i] = MathUtils.lerp(p[i], v.x, n)
      p[i + 1] = MathUtils.lerp(p[i + 1], v.y, n)
      p[i + 2] = MathUtils.lerp(p[i + 2], v.z, n)
    }
    return g
  }

  useEffect(() => {
    const gui = new GUI()
    gui.add(data, 'n', -64, 64).onChange((v) => {
      ref.current.geometry = generateSquircle(v)
      bounds.refresh(ref.current).fit()
    })
    return () => {
      gui.destroy()
    }
  },[])

  return (
    <mesh ref={ref} geometry={generateSquircle(2)} position-y={1}>
      <meshPhysicalMaterial metalness={0} roughness={0.36} clearcoat={1} transmission={1} ior={1.53} thickness={5} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 2, -1.5] }}>
      <Environment files="/img/rustig_koppie_puresky_1k.hdr" background />
      <Bounds fit margin={1.8} damping={10}>
        <Squircle />
      </Bounds>
      <OrbitControls target={[0, 1, 0]} autoRotate />
      <Stats />
    </Canvas>
  )
}
