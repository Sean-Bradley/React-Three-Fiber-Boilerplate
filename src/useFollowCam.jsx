import { useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Object3D } from 'three'

export default function useFollowCam(offset) {
  const { scene, camera } = useThree()

  const pivot = useMemo(() => new Object3D(), []) // rotate left/right circle
  const pitch = useMemo(() => new Object3D(), []) // looking from up/down

  const onDocumentMouseMove = (e) => {
    if (document.pointerLockElement) {
      pivot.rotation.y -= e.movementX * 0.002
      const v = pitch.rotation.x - e.movementY * 0.002
      if (v > -1 && v < 0.1) {
        pitch.rotation.x = v
      }
    }
    return false
  }

  const onDocumentMouseWheel = (e) => {
    if (document.pointerLockElement) {
      const v = camera.position.z + e.deltaY * 0.005
      if (v >= 0.5 && v <= 5) {
        camera.position.z = v
      }
    }
    return false
  }

  useEffect(() => {
    scene.add(pivot)
    pivot.add(pitch)
    pitch.add(camera)
    camera.position.set(...offset)

    document.addEventListener('mousemove', onDocumentMouseMove)
    document.addEventListener('mousewheel', onDocumentMouseWheel)
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove)
      document.removeEventListener('mousewheel', onDocumentMouseWheel)
    }
  })

  return { pivot }
}
