// import { useFrame,useThree } from '@react-three/fiber'
// import { PointerLockControls } from '@react-three/drei'
// import { useMemo, useEffect, useRef } from 'react'
// import { Object3D, Mesh, Vector3, SphereGeometry, MeshNormalMaterial } from 'three'

// export default function FollowCam({ setShowMenu, followCamPivot }) {
//   const ref = useRef()
//   const followCam = useMemo(() => {
//     //const o = new Object3D()
//     const o = new Mesh(new SphereGeometry(.2), new MeshNormalMaterial({ wireframe: true }))
//     o.position.z = 2
//     return o
//   }, [])

//   const camTo = useMemo(() => new Vector3(), [])
//   useEffect(() => {
//     console.log('adding cam to pivot')
//     followCamPivot.add(followCam)
//   }, [followCamPivot, followCam])

//   useFrame(({ camera }, delta) => {
//     followCam.getWorldPosition(camTo)
//     camera.position.lerpVectors(camera.position, camTo, delta * 5)
//   })

//   const onDocumentMouseMove = (e) => {
//     followCamPivot.rotation.y -= e.movementX * 0.002
//     followCamPivot.rotation.x -= e.movementY * 0.002
//     return false
//   }

//   const onDocumentMouseWheel = (e) => {
//     let newVal = followCam.position.z + e.deltaY * 0.05
//     if (newVal > 0.25 && newVal < 10) {
//       followCam.position.z = newVal
//     }
//     return false
//   }

//   return (
//     <PointerLockControls
//       ref={ref}
//       onLock={() => {
//         setShowMenu(false)
//         document.addEventListener('mousemove', onDocumentMouseMove)
//         document.addEventListener('mousewheel', onDocumentMouseWheel)
//       }}
//       onUnlock={() => {
//         setShowMenu(true)
//         document.removeEventListener('mousemove', onDocumentMouseMove)
//         document.removeEventListener('mousewheel', onDocumentMouseWheel)
//       }}
//     />
//   )
// }
