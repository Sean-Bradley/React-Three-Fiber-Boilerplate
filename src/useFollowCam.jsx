import { useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Object3D } from 'three'

export default function useFollowCam() {
  const { scene, camera } = useThree()

  const pivot = useMemo(() => new Object3D(), [])
  const followCam = useMemo(() => {
    const o = new Object3D()
    o.position.set(0, 1, 2)
    return o
  }, [])

  const onDocumentMouseMove = (e) => {
    if (document.pointerLockElement) {
      pivot.rotation.y -= e.movementX * 0.002
      const v = followCam.rotation.x - e.movementY * 0.002
      if (v >= -1.0 && v <= 0.4) {
        followCam.rotation.x = v
        followCam.position.y = -v * followCam.position.z + 1
      }
    }
    return false
  }

  const onDocumentMouseWheel = (e) => {
    if (document.pointerLockElement) {
      const v = followCam.position.z + e.deltaY * 0.002
      if (v >= 0.5 && v <= 4) {
        followCam.position.z = v
      }
    }
    return false
  }

  useEffect(() => {
    camera.position.set(0, 0, 0)
    followCam.add(camera)
    pivot.add(followCam)
    scene.add(pivot)
    //console.log('attach followCam listeners')
    document.addEventListener('mousemove', onDocumentMouseMove)
    document.addEventListener('mousewheel', onDocumentMouseWheel)
    return () => {
      //console.log('remove followCam listeners')
      document.removeEventListener('mousemove', onDocumentMouseMove)
      document.removeEventListener('mousewheel', onDocumentMouseWheel)
    }
  })

  return { pivot }
}