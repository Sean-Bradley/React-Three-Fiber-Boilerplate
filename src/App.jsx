import { Stats, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Debug, Physics, useBox, usePlane } from "@react-three/cannon";
import { useControls } from "leva";

function Plane(props) {
  usePlane(() => ({ ...props }));
}

function InstancedBoxes() {
  const [ref, { at }] = useBox(
    (i) => ({
      args: [1, 1, 1],
      type: "Dynamic",
      position: [
        Math.floor(i % 8) * 1.01 - 4,
        Math.floor((i / 64) % 64) * 1.01 + 4,
        Math.floor((i / 8) % 8) * 1.01 - 4,
      ],
    }),
    useRef(),
  );

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, 512]}
      onPointerDown={(e) => {
        e.stopPropagation();
        at(e.instanceId).mass.set(1);
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </instancedMesh>
  );
}

export default function App() {
  const gravity = useControls("Gravity", {
    x: { value: 0, min: -10, max: 10, step: 0.1 },
    y: { value: -9.8, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 },
  });

  return (
    <Canvas camera={{ position: [6, 9, 9] }}>
      <Physics gravity={[gravity.x, gravity.y, gravity.z]}>
        <Debug color={0x004400}>
          <Plane rotation={[-Math.PI / 2, 0, 0]} />
        </Debug>
        <InstancedBoxes />
      </Physics>
      <OrbitControls target-y={5} />
      <Stats />
    </Canvas>
  );
}
