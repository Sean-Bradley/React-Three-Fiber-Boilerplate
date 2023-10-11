import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import {
  Stats,
  OrbitControls,
  OrthographicCamera,
  Environment
} from '@react-three/drei'
import { useLoader } from '@react-three/fiber'

export default function App() {
  const rtop = useLoader(THREE.TextureLoader, './img/rtop.jpg')
  const rleft = useLoader(THREE.TextureLoader, './img/rleft.jpg')
  const rright = useLoader(THREE.TextureLoader, './img/rright.jpg')
  return (
    <Canvas camera={{ position: [1, 1, 1] }}>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial
          attach="material-0"
          map={rright}
          map-repeat={0.5}
          map-offset-x={0.5}
        />
        <meshBasicMaterial attach="material-1" color="orange" />
        <meshStandardMaterial
          attach="material-2"
          map={rtop}
          map-repeat={0.5}
          map-offset-y={0.5}
          // map-center={(0.5, 0.5)}
          // map-rotation={Math.PI/4}
        />
        <meshBasicMaterial attach="material-3" color="orange" />
        <meshStandardMaterial
          attach="material-4"
          map={rleft}
          map-repeat={0.5}
          map-offset-y={1}
          // map-wrapS={THREE.RepeatWrapping}
          map-wrapT={THREE.RepeatWrapping}
        />
        <meshBasicMaterial attach="material-5" color="orange" />
      </mesh>
      <ambientLight color="blue"></ambientLight>
      <Environment preset="forest"></Environment>
      <OrthographicCamera makeDefault position={[1, 1, 1]} zoom={400} />
      <OrbitControls />
      <Stats />
    </Canvas>
  )
}
