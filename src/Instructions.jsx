import { useEffect, useState } from 'react'
import { useStore } from './App'

export default function Instructions() {
  const [showInstructions, setShowInstructions] = useState(true)
  const setGameStarted = useStore((state) => state.setGameStarted)

  function pointerlockchange() {
    setShowInstructions(!showInstructions)
    //if(!showInstructions){
    setGameStarted(showInstructions)
    //}
  }

  useEffect(() => {
    document.addEventListener('pointerlockchange', pointerlockchange, false)
    return () => {
      document.removeEventListener('pointerlockchange', pointerlockchange, false)
    }
  })

  return (
    <div id="instructions" className={showInstructions ? 'show' : 'hide'}>
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
          showInstructions && (await e.target.requestPointerLock())
        }}>
        Click To Enter
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
