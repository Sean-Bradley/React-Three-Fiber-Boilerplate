import { useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Object3D } from 'three'

export default function useFollowCam(offset) {
  const { scene, camera } = useThree()

  const pivot = useMemo(() => new Object3D(), [])
  const alt = useMemo(() => new Object3D(), [])
  const yaw = useMemo(() => new Object3D(), [])
  const pitch = useMemo(() => new Object3D(), [])
  const roll = useMemo(() => new Object3D(), [])

  const onDocumentMouseMove = (e) => {
    if (document.pointerLockElement) {
      yaw.rotation.y -= e.movementX * 0.002
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
    pivot.add(alt)
    alt.position.y = offset[1]
    alt.add(yaw)
    yaw.add(pitch)
    pitch.add(roll)
    roll.add(camera)
    camera.position.set(offset[0], 0, offset[2])

    document.addEventListener('mousemove', onDocumentMouseMove)
    document.addEventListener('mousewheel', onDocumentMouseWheel)
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove)
      document.removeEventListener('mousewheel', onDocumentMouseWheel)
    }
  })

  return { pivot, alt, yaw, pitch, roll }
}
