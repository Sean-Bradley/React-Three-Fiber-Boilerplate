export default function Box() {
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe={true} />
    </mesh>
  )
}