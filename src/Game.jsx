import { Debug, useContactMaterial } from '@react-three/cannon'
import Start from './Start'
import Platform from './Platform'
import Spinner from './Spinner'
//import Obstacles from './Obstacles'
import Player from './Player'
import { useControls } from 'leva'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
//import { useFrame } from '@react-three/fiber'

function ToggleDebug({ children }) {
  const debugRendererVisible = useControls('Debug Renderer', { visible: false })

  return <>{debugRendererVisible.visible ? <Debug>{children}</Debug> : <>{children}</>}</>
}

export default function Game() {
  const lightRef = useRef()

  useFrame((state) => {
    lightRef.current.position.set(state.camera.position.x + 10, state.camera.position.y + 7.5, state.camera.position.z + 7.5)
    lightRef.current.target.position.x = state.camera.position.x
    lightRef.current.target.updateMatrixWorld()
  })

  useContactMaterial('ground', 'slippery', {
    friction: 0.018,
    restitution: 0.3,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3
  })

  return (
    <>
      <ToggleDebug>
        <Start args={[10, 0.1, 10]} />

        <Platform args={[1, 0.1, 2]} position={[0, 0, 6]} />

        <Platform args={[2, 0.1, 1]} position={[3, 0, 6]} />

        <Platform args={[2, 0.1, 1]} position={[5, 1, 6]} />

        <Platform args={[0.25, 0.1, 5]} position={[5, 2, 2]} />

        <Platform args={[4, 0.1, 5]} position={[5, 2, -3]} />
        <Spinner position={[5, 3, -3]} />

        <Platform args={[1, 0.1, 2]} position={[5, 2.5, -8]} />

        <Platform args={[4, 0.1, 4]} position={[1, 3, -8]} />
        <Spinner position={[1, 4, -8]} />

        <Platform args={[1, 0.1, 2]} position={[1, 3, -3.5]} />

        {/* <Player position={[1, 4, -3]} /> */}
        <Player position={[0, 1, 0]} />
      </ToggleDebug>
      <directionalLight
        ref={lightRef}
        position={[10, 7.5, 7.5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={40}
        shadow-camera-top={30}
      />
    </>
  )
}
