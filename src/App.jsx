import { Suspense, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html, useProgress, Stats } from '@react-three/drei'
import { Model } from './House'
import annotations from './annotations.json'

function Annotations({ selected, gotoAnnotation }) {
  return (
    <>
      {annotations.map((a, i) => {
        return (
          <Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
            <svg height="34" width="34" transform="translate(-16 -16)" style={{ cursor: 'pointer' }}>
              <circle
                cx="17"
                cy="17"
                r="16"
                stroke="white"
                strokeWidth="2"
                fill="rgba(0,0,0,.66)"
                onClick={() => gotoAnnotation(i)}
              />
              <text x="12" y="22" fill="white" fontSize={17} fontFamily="monospace" style={{ pointerEvents: 'none' }}>
                {i + 1}
              </text>
            </svg>
            {a.description && i === selected && (
              <div
                id={'desc_' + i}
                className="annotationDescription"
                dangerouslySetInnerHTML={{ __html: a.description }}
              />
            )}
          </Html>
        )
      })}
    </>
  )
}

function Buttons({ gotoAnnotation }) {
  return (
    <div id="annotationsPanel">
      <ul>
        {annotations.map((a, i) => {
          return (
            <li key={i}>
              <button key={i} className="annotationButton" onClick={() => gotoAnnotation(i)}>
                {a.title}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Animate({ controls, lerping, to, target }) {
  useFrame(({ camera }, delta) => {
    if (lerping) {
      camera.position.lerp(to, delta * 2)
      controls.current.target.lerp(target, delta * 2)
    }
  })
}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

export default function App() {
  const ref = useRef()
  const [lerping, setLerping] = useState(false)
  const [to, setTo] = useState()
  const [target, setTarget] = useState()
  const [selected, setSelected] = useState(-1)

  function gotoAnnotation(idx) {
    setTo(annotations[idx].camPos)
    setTarget(annotations[idx].lookAt)
    setSelected(idx)
    setLerping(true)
  }

  return (
    <>
      <Canvas camera={{ position: [10, 10, 10] }} onPointerDown={() => setLerping(false)}>
        <OrbitControls ref={ref} target={[8, 2, 3]} />
        <Suspense fallback={<Loader />}>
          <Environment preset="forest" background />
          <Model />
          <Annotations selected={selected} gotoAnnotation={gotoAnnotation} />
          <Animate controls={ref} lerping={lerping} to={to} target={target} />
        </Suspense>
        <Stats />
      </Canvas>
      <Buttons gotoAnnotation={gotoAnnotation} />
    </>
  )
}
