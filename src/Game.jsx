import { Debug } from '@react-three/cannon'
import Start from './Start'
import Finish from './Finish'
import Platform from './Platform'
import Spinner from './Spinner'
import Player from './Player'
import { useControls } from 'leva'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { create } from 'zustand'
import { AnimationMixer } from 'three'

export const useStore = create(() => ({
  groundObjects: [],
  actions: {},
  mixer: new AnimationMixer()
  // activeAction: 0, //0:idle, 1:walking, 2:jumping
  // setActiveAction: (v) => set({ activeAction: v })
}))

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

  return (
    <>
      <ToggleDebug>
        <Start position={[0, -0.5, 0]} />

        <Platform args={[1, 0.1, 2]} position={[0, 0, 6]} />

        <Platform args={[2, 0.1, 1]} position={[3, 0.25, 6]} />

        <Platform args={[2, 0.1, 1]} position={[6, 1, 6]} />

        <Platform args={[0.25, 0.1, 5]} position={[6, 2, 2]} />

        <Platform args={[4, 0.1, 5]} position={[6, 2, -3]} />
        <Spinner position={[6, 2.8, -3]} />

        <Platform args={[1, 0.1, 2]} position={[6.5, 2.5, -7.5]} />

        <Platform args={[4, 0.1, 4]} position={[2.5, 3, -8]} />
        <Spinner position={[2.5, 3.8, -8]} />

        <Platform args={[1, 0.1, 2]} position={[1.5, 3.5, -3.5]} rotation-x={Math.PI / 2} />

        <Finish position={[-5.5, 0, 5.5]} />
      </ToggleDebug>
      <Player position={[0, 1, 0]} />
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
