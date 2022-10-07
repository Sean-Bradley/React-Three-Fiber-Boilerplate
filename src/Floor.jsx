export default function Floor() {
    return (
      <mesh rotation-x={-Math.PI / 2} receiveShadow={true}>
        <circleGeometry args={[10]} />
        <meshStandardMaterial />
      </mesh>
    )
  }