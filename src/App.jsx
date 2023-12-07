import { Stats, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Physics, useBox, useSphere } from "@react-three/cannon";

const numCubes = 100;

function Sphere(props) {
  const [ref, { position, velocity }] = useSphere(() => ({
    args: [0.75],
    mass: 1,
    ...props,
  }));

  useEffect(() => {
    const unsubscribe = position.subscribe((v) => {
      if (v[1] < -10) {
        velocity.set(0, 0, 0);
        position.set(0, 5, 0);
      }
    });
    return unsubscribe;
  }, [position, velocity]);

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.75]} />
      <meshStandardMaterial />
    </mesh>
  );
}

function InstancedBoxes() {
  const { clock } = useThree();

  const [ref, { at }] = useBox((i) => {
    return {
      args: [0.99, 0.99, 0.99],
      position: [Math.floor(i % 10) - 4.5, 1, Math.floor((i / 10) % 10) - 4.5],
    };
  });

  useEffect(() => {
    for (let i = 0; i < numCubes; i++) {
      at(i).position.subscribe((v) => {
        at(i).position.set(
          v[0],
          Math.sin(clock.getElapsedTime() + i / 10),
          v[2],
        );
      });
    }
  }, [at, clock]);

  return (
    <instancedMesh
      receiveShadow
      castShadow
      ref={ref}
      args={[undefined, undefined, numCubes]}
    >
      <boxGeometry args={[0.99, 0.99, 0.99]} />
      <meshStandardMaterial />
    </instancedMesh>
  );
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [4, 3, 2] }}>
      <spotLight
        position={[2.5, 5, 5]}
        angle={Math.PI / 3}
        penumbra={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        intensity={Math.PI * 20}
      />
      <Physics>
        <InstancedBoxes />
        <Sphere position={[0, 5, 0]} />
      </Physics>
      <OrbitControls />
      <Stats />
    </Canvas>
  );
}
