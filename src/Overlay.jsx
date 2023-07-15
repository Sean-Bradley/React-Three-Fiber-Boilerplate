import { useState, useEffect } from 'react'
import { Html, Hud, OrthographicCamera } from '@react-three/drei'
import { useStore } from './App'

export default function Overlay() {
  //console.log('updating score')
  const [time, setTime] = useState(0)
  const gameStarted = useStore((state) => state.gameStarted)

  useEffect(() => {
    const interval = setInterval(() => {
      gameStarted && setTime(time + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [time, gameStarted])

  return (
    <Hud>
      <OrthographicCamera makeDefault position={[0, 0, 0]} />
      <Html>
        <div id="time">{time}</div>
      </Html>
    </Hud>
  )
}
