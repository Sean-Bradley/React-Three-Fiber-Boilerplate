import { useEffect } from 'react'
import { Html, Hud, OrthographicCamera } from '@react-three/drei'
import { useStore } from './App'

export default function Overlay() {
  const { gameStarted, finished, time, setTime } = useStore((state) => state)

  useEffect(() => {
    const interval = setInterval(() => {
      gameStarted && !finished && setTime(time + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [gameStarted, time, setTime, finished])

  return (
    <>
      <Hud>
        <OrthographicCamera makeDefault />
        <Html>
          <div id="time">{gameStarted && time}</div>
        </Html>
        <Html>
          <div id="levelCompleted">{finished && "Level Completed. Well Done!"}</div>
        </Html>
      </Hud>
    </>
  )
}
