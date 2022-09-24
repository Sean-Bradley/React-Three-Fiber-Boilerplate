export default function Box(props) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe={true} />
    </mesh>
  )
}
