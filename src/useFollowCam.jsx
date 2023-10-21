import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Object3D, Vector3 } from 'three'

export default function useFollowCam(ref, offset) {
  const { scene, camera } = useThree()

  const pivot = useMemo(() => new Object3D(), [])
  const alt = useMemo(() => new Object3D(), [])
  const yaw = useMemo(() => new Object3D(), [])
  const pitch = useMemo(() => new Object3D(), [])
  const worldPosition = useMemo(() => new Vector3(), [])

  function onDocumentMouseMove(e) {
    if (document.pointerLockElement) {
      e.preventDefault()
      yaw.rotation.y -= e.movementX * 0.002
      const v = pitch.rotation.x - e.movementY * 0.002
      if (v > -1 && v < 0.1) {
        pitch.rotation.x = v
      }
    }
  }

  function onDocumentMouseWheel(e) {
    if (document.pointerLockElement) {
      e.preventDefault()
      const v = camera.position.z + e.deltaY * 0.005
      if (v >= 0.5 && v <= 5) {
        camera.position.z = v
      }
    }
  }

  useEffect(() => {
    scene.add(pivot)
    pivot.add(alt)
    alt.position.y = offset[1]
    alt.add(yaw)
    yaw.add(pitch)
    pitch.add(camera)
    camera.position.set(offset[0], 0, offset[2])

    document.addEventListener('mousemove', onDocumentMouseMove)
    document.addEventListener('mousewheel', onDocumentMouseWheel)
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove)
      document.removeEventListener('mousewheel', onDocumentMouseWheel)
    }
  }, [camera])

  useFrame((_, delta) => {
    ref.current.getWorldPosition(worldPosition)
    pivot.position.lerp(worldPosition, delta * 5)
  })

  return { pivot, alt, yaw, pitch }
}
