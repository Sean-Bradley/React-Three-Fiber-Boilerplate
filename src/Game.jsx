import { Debug, useContactMaterial } from '@react-three/cannon'
import Floor from './Floor'
import Obstacles from './Obstacles'
import Player from './Player'
import { useControls } from 'leva'
import useFollowCam from './useFollowCam'

function ToggleDebug({ children }) {
  const debugRendererVisible = useControls('Debug Renderer', { visible: false })

  return <>{debugRendererVisible.visible ? <Debug>{children}</Debug> : <>{children}</>}</>
}

export default function Game() {
  const { pivot } = useFollowCam()

  useContactMaterial('ground', 'slippery', {
    friction: 0,
    restitution: 0.3,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3
  })

  return (
    <>
      <ToggleDebug>
        <Floor rotation={[-Math.PI / 2, 0, 0]} material={'ground'} />
        <Obstacles />
        <Player pivot={pivot} position={[0, 1, 0]} linearDamping={0.95} material={'slippery'} />
      </ToggleDebug>
    </>
  )
}
