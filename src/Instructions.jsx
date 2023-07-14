import { useEffect, useState } from 'react'

export default function Instructions() {
  const [showInstructions, setShowInstructions] = useState(true)

  function pointerlockchange() {
    setShowInstructions(!showInstructions)
  }

  useEffect(() => {
    document.addEventListener('pointerlockchange', pointerlockchange, false)
    return () => {
      document.removeEventListener('pointerlockchange', pointerlockchange, false)
    }
  })

  return (
    <div id="instructions" className={showInstructions ? 'show' : 'hide'}>
      WASD to move
      <br />
      SPACE to jump.
      <br />
      Model from{' '}
      <a href="https://www.mixamo.com" target="_blank" rel="nofollow noreferrer">
        Mixamo
      </a>
      <br />
      <button
        id="button"
        onClick={async (e) => {
          showInstructions && (await e.target.requestPointerLock())
        }}>
        Click To Enter
      </button>
    </div>
  )
}
