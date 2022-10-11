import { Stats, OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Leva, useControls, button } from 'leva'
import { Vector3 } from 'three'

function Lights() {
  return (
    <>
      <directionalLight
        intensity={1}
        castShadow={true}
        shadow-bias={-0.0002}
        shadow-mapSize={[2048, 2048]}
        position={[85.0, 80.0, 70.0]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
    </>
  )
}

function Arena({ controls, lerpEnabled, setLerping, annotations }) {
  const { scene } = useGLTF('./models/collision-world.glb')
  const [to, setTo] = useState(new Vector3(10, 10, 10))
  const [target, setTarget] = useState(new Vector3(0, 1, 0))

  useControls('Camera', {
    'View A': button(() => {
      setLerping(true)
      setTo(new Vector3().copy(annotations.viewA.position))
      setTarget(new Vector3().copy(annotations.viewA.lookAt))
    }),
    'View B': button(() => {
      setLerping(true)
      setTo(new Vector3().copy(annotations.viewB.position))
      setTarget(new Vector3().copy(annotations.viewB.lookAt))
    }),
    'View C': button(() => {
      setLerping(true)
      setTo(new Vector3().copy(annotations.viewC.position))
      setTarget(new Vector3().copy(annotations.viewC.lookAt))
    })
  })

  useFrame(({ camera }, delta) => {
    if (lerpEnabled) {
      //} && camera.position.distanceTo(to) > 0.1) {
      camera.position.lerp(to, 3 * delta)
      controls.current.target.lerp(target, 3 * delta)
    }
  })

  function GetRaycasterPosition() {
    const state = useThree()
    console.log(state)
  }

  return (
    <>
      <primitive
        object={scene}
        children-0-castShadow
        children-0-receiveShadow
        children-0-material-envMapIntensity={0.4}
        onDoubleClick={() => console.log(scene)}
        onUpdate={() => scene.children[0].geometry.computeBoundingBox()}
      />
      <mesh onDoubleClick={() => console.log(scene)}>
        <sphereGeometry args={[5]} />
      </mesh>
    </>
  )
}
export default function App() {
  const ref = useRef()
  const [lerping, setLerping] = useState(false)
  const annotations = {
    viewA: {
      title: 'View A',
      description: '<p>Looking Down from Above</p>',
      position: {
        x: 0,
        y: 40,
        z: 0
      },
      lookAt: {
        x: 0,
        y: 0,
        z: 0
      }
    },
    viewB: {
      title: 'View B',
      position: {
        x: 8,
        y: -1.5,
        z: 2
      },
      lookAt: {
        x: 8.1,
        y: -1.5,
        z: 2
      }
    },
    viewC: {
      title: 'View C',
      position: {
        x: 8,
        y: 5,
        z: 11
      },
      lookAt: {
        x: 8,
        y: 4.9,
        z: 11
      }
    }
  }

  return (
    <>
      <Canvas
        camera={{ position: [10, 10, 10] }}
        onPointerDown={() => setLerping(false)}
        shadows>
        <Lights />
        <Environment
          files="./img/drakensberg_solitary_mountain_1k.hdr"
          background
        />
        <OrbitControls ref={ref} target={[0, 1, 0]} />
        <Arena
          controls={ref}
          lerpEnabled={lerping}
          setLerping={setLerping}
          annotations={annotations}
        />
        <Stats />
      </Canvas>
      <Leva />
    </>
  )
}
