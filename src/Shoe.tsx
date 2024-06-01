import React from 'react';
import {useEffect, useState} from 'react';
import {ObjectMap, ThreeEvent} from '@react-three/fiber';
import {useGLTF} from '@react-three/drei';
import {useControls} from 'leva';
import {Color, Mesh, Material, MeshStandardMaterial} from 'three';
import {GLTF} from 'three/examples/jsm/Addons.js';
//import {GLTF} from '@types/three/examples/jsm/loaders/GLTFLoader';
//import {GLTF} from '@types/three/addons/loaders/GLTFLoader';

interface IGLTF extends GLTF, ObjectMap {
  nodes: {[key: string]: Mesh};
  materials: {[key: string]: MeshStandardMaterial};
}

const Shoe = () => {
  const [hovered, setHovered] = useState(false);

  const {nodes, materials} = useGLTF('./models/shoe-draco.glb') as unknown as IGLTF;

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useControls('Shoe', () => {
    console.log('creating color pickers');

    // using reduce
    return Object.keys(materials).reduce(
      (acc, m) =>
        Object.assign(acc, {
          [m]: {
            value: '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
            onChange: (v: Color) => {
              materials[m].color = new Color(v);
            },
          },
        }),
      {},
    );
  });

  // JSX of glTF created using the command
  // npx gltfjsx .\public\models\shoe-draco.glb

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    (document.getElementById('Shoe.' + ((e.object as Mesh).material as Material).name) as HTMLElement).focus();
  };

  const onPointerOver = () => setHovered(true);
  const onPointerOut = () => setHovered(false);

  return (
    <group dispose={null} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  );
};

export default Shoe;

//useGLTF.preload('./models/shoe-draco.glb');
