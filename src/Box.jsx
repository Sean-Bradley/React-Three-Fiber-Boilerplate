import React, { useRef, useEffect } from 'react'

export default function Box(props) {
  const ref = useRef()

  useEffect(() => {
    console.log(ref.current)
  })

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe={true} />
    </mesh>
  )
}
