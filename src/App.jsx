import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, CubeCamera } from '@react-three/drei'

export default function App() {
  return (
    <Canvas>
      <Environment
        background
        files={['px', 'nx', 'py', 'ny', 'pz', 'nz'].map(
          (n) => `/img/${n}_mw_25.jpg`
        )}
      />
      <CubeCamera>
        {(texture) => (
          <mesh>
            <meshBasicMaterial envMap={texture} roughness={0} metalness={1} />
            <icosahedronGeometry args={[2.5, 0]} />
          </mesh>
        )}
      </CubeCamera>
      <OrbitControls autoRotate />
    </Canvas>
  )
}
