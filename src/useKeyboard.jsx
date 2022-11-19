import { useEffect } from 'react'

export default function useKeyboard() {
  const keyMap = {}

  useEffect(() => {
    const onDocumentKey = (e) => {
      keyMap[e.key] = e.type === 'keydown'
    }
    document.addEventListener('keydown', onDocumentKey)
    document.addEventListener('keyup', onDocumentKey)
  })

  return keyMap
}
