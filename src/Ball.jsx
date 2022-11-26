export default function Ball({ radius }) {
  return (
    <mesh castShadow>
      <sphereGeometry args={[radius]} />
      <meshStandardMaterial />
    </mesh>
  )
}
