export default function Ball({ radius }) {
  return (
    <mesh castShadow>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial />
      {/* <meshNormalMaterial wireframe /> */}
    </mesh>
  )
}
