import React from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Environment, ContactShadows} from '@react-three/drei';
import Shoe from './Shoe';

export default function App() {
  return (
    <Canvas shadows camera={{position: [0, 0, 1.66]}}>
      <Environment files="./img/forest_slope_1k.hdr" />
      <Shoe />
      <ContactShadows position={[0, -0.8, 0]} color="#ffffff" />
      <OrbitControls autoRotate />
    </Canvas>
  );
}
