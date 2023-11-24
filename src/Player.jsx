import { Suspense, useState, useEffect } from 'react'
import Eve from './Eve'
import useKeyboard from './useKeyboard'
import { useFrame } from '@react-three/fiber'
import { useStore } from './App'

let wait = false
let actionAssigned = false

export default function Player() {
  const keyboard = useKeyboard()

  const { actions, mixer } = useStore((state) => state)

  const [action, setAction] = useState()

  useEffect(() => {
    action?.reset().fadeIn(0.1).play()
    return () => {
      action?.fadeOut(0.1)
    }
  }, [action])

  useFrame((_, delta) => {
    if (!wait) {
      actionAssigned = false

      if (keyboard['KeyW']) {
        setAction(actions['walk'])
        actionAssigned = true
      }
      if (keyboard['KeyW'] && keyboard['ShiftLeft']) {
        setAction(actions['running'])
        actionAssigned = true
      }
      if (keyboard['Space']) {
        setAction(actions['jump'])
        actionAssigned = true
        wait = true // wait for jump to finish
        setTimeout(() => (wait = false), 1000)
      }
      if (keyboard['KeyQ']) {
        setAction(actions['pose'])
        actionAssigned = true
      }

      !actionAssigned && setAction(actions['idle'])
    }

    mixer.update(delta)
  })

  return (
    <>
      <Suspense fallback={null}>
        <Eve />
      </Suspense>
    </>
  )
}
