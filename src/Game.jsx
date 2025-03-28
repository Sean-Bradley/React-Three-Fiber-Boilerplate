import { Debug, useContactMaterial } from '@react-three/cannon'
import Floor from './Floor'
import Obstacles from './Obstacles'
import Player from './Player'
import { useControls } from 'leva'

function ToggleDebug({ children }) {
  const debugRendererVisible = useControls('Debug Renderer', { visible: false })

  return <>{debugRendererVisible.visible ? <Debug color={0x008800}>{children}</Debug> : <>{children}</>}</>
}

export default function Game() {
 
  return (
    <>
      <Floor />
      <Obstacles />
      <Player position={[0, 1, 0]} />
    </>
  )
}
