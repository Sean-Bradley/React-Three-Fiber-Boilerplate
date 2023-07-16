import { useEffect } from 'react'
import { useStore } from './App'

export default function Instructions() {
  const { gameStarted, setGameStarted } = useStore((state) => state)

  function pointerlockchange() {
    setGameStarted(!gameStarted)
    // disabling and enabling button after 2 seconds prevents pointerlock error if re-entered to quickly
    if (!gameStarted) {
      document.getElementById('button').style.visibility = 'hidden'
      setTimeout(() => {
        document.getElementById('button').style.visibility = 'visible'
      }, 2000)
    }
  }

  useEffect(() => {
    document.addEventListener('pointerlockchange', pointerlockchange, false)
    return () => {
      document.removeEventListener('pointerlockchange', pointerlockchange, false)
    }
  })

  return (
    <div id="instructions" className={gameStarted ? 'hide' : 'show'}>
      <h1>Obstacle Course</h1>
      <p>Get to the end and be the best</p>
      <kbd>W</kbd>&nbsp;<kbd>A</kbd>&nbsp;<kbd>S</kbd>&nbsp;<kbd>D</kbd> to move
      <br />
      <kbd>SPACE</kbd> to jump.
      <br />
      <br />
      <button
        id="button"
        onClick={async (e) => {
          !gameStarted && (await e.target.requestPointerLock())
        }}>
        Click To Play
      </button>
      <p>
        Eve model and animations from{' '}
        <a href="https://www.mixamo.com" target="_blank" rel="nofollow noreferrer">
          Mixamo
        </a>
      </p>
    </div>
  )
}
