import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('./models/house-water.glb')

  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.house_water001_1.geometry} material={materials['ground_1.001']} />
        <mesh
          geometry={nodes.house_water001_2.geometry}
          material={materials['wall_1_2.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes.house_water001_3.geometry}
          material={materials['room_50_296.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes.house_water001_4.geometry}
          material={materials['room_53_302.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes.house_water001_5.geometry} material={materials['Railing.001']} />
        <mesh geometry={nodes.house_water001_6.geometry} material={materials['Frame.001']} />
        <mesh geometry={nodes.house_water001_7.geometry} material={materials['Steps.001']} />
        <mesh geometry={nodes.house_water001_8.geometry} material={materials['340.001']} />
        <mesh geometry={nodes.house_water001_9.geometry} material={materials['343.001']} />
        <mesh geometry={nodes.house_water001_10.geometry} material={materials['344.001']} />
        <mesh geometry={nodes.house_water001_11.geometry} material={materials['345.001']} />
        <mesh geometry={nodes.house_water001_12.geometry} material={materials['white.001']} />
        <mesh geometry={nodes.house_water001_13.geometry} material={materials['Cube140_348.001']} />
        <mesh geometry={nodes.house_water001_14.geometry} material={materials['silver.001']} />
        <mesh
          geometry={nodes.house_water001_15.geometry}
          material={materials['grey.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes.house_water001_16.geometry} material={materials['flltgrey.001']} />
        <mesh geometry={nodes.house_water001_17.geometry} material={materials['ltgrey.001']} />
        <mesh geometry={nodes.house_water001_18.geometry} material={materials['white_355.001']} />
        <mesh geometry={nodes.house_water001_19.geometry} material={materials['359.001']} />
        <mesh
          geometry={nodes.house_water001_20.geometry}
          material={materials['default.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes.house_water001_21.geometry} material={materials['yellowbrt.001']} />
        <mesh
          geometry={nodes.house_water001_22.geometry}
          material={materials['redbrick.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes.house_water001_23.geometry}
          material={materials['flblonde.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes.house_water001_24.geometry}
          material={materials['iris.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes.house_water001_25.geometry}
          material={materials['flltgrey_sweethome3d_window_pane_376.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes.house_water001_26.geometry} material={materials['lighttan.001']} />
        <mesh geometry={nodes.house_water001_27.geometry} material={materials['white_Cube_2_1_389.001']} />
        <mesh
          geometry={nodes.house_water001_28.geometry}
          material={materials['Glass.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes.house_water001_29.geometry}
          material={materials['Glass_414.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes.house_water001_30.geometry} material={materials['Lock.001']} />
        <mesh geometry={nodes.house_water001_31.geometry} material={materials['Frame_in.001']} />
        <mesh geometry={nodes.house_water001_32.geometry} material={materials['Cage_in.001']} />
        <mesh geometry={nodes.house_water001_33.geometry} material={materials['Frame_out.001']} />
        <mesh geometry={nodes.house_water001_34.geometry} material={materials['Cage_out.001']} />
        <mesh geometry={nodes.house_water001_35.geometry} material={materials['material_9.001']} />
        <mesh geometry={nodes.house_water001_36.geometry} material={materials['material_10.001']} />
        <mesh geometry={nodes.house_water001_37.geometry} material={materials['material_2.001']} />
        <mesh geometry={nodes.house_water001_38.geometry} material={materials['material_3.001']} />
        <mesh geometry={nodes.house_water001_39.geometry} material={materials['material_8.001']} />
        <mesh geometry={nodes.house_water001_40.geometry} material={materials['material_1.001']} />
        <mesh geometry={nodes.house_water001_41.geometry} material={materials['material_11.001']} />
        <mesh geometry={nodes.house_water001_42.geometry} material={materials['material.001']} />
        <mesh geometry={nodes.house_water001_43.geometry} material={materials['material_0.001']} />
        <mesh geometry={nodes.house_water001_44.geometry} material={materials['material_4.001']} />
        <mesh geometry={nodes.house_water001_45.geometry} material={materials['material_5.001']} />
        <mesh geometry={nodes.house_water001_46.geometry} material={materials['material_6.001']} />
        <mesh geometry={nodes.house_water001_47.geometry} material={materials['material_7.001']} />
        <mesh geometry={nodes.house_water001_48.geometry} material={materials['archwhite.001']} />
        <mesh geometry={nodes.house_water001_49.geometry} material={materials['sweethome3d_window_mirror_707.001']} />
        <mesh geometry={nodes.house_water001_50.geometry} material={materials['aqua.001']} />
        <mesh geometry={nodes.house_water001_51.geometry} material={materials['Rectangle04_1.001']} />
        <mesh geometry={nodes.house_water001_52.geometry} material={materials['black.001']} />
        <mesh geometry={nodes.house_water001_53.geometry} material={materials['sink_chrome.001']} />
        <mesh geometry={nodes.house_water001_54.geometry} material={materials['sink_faiance.001']} />
        <mesh geometry={nodes.house_water001_55.geometry} material={materials['chrome_dark.001']} />
        <mesh geometry={nodes.house_water001_56.geometry} material={materials['White_ceramic.001']} />
        <mesh geometry={nodes.house_water001_57.geometry} material={materials['White_plastic.001']} />
        <mesh geometry={nodes.house_water001_58.geometry} material={materials['paper.001']} />
        <mesh geometry={nodes.house_water001_59.geometry} material={materials['Cardboard.001']} />
        <mesh geometry={nodes.house_water001_60.geometry} material={materials['746.001']} />
        <mesh geometry={nodes.house_water001_61.geometry} material={materials['747.001']} />
        <mesh geometry={nodes.house_water001_62.geometry} material={materials['None.001']} />
        <mesh geometry={nodes.house_water001_63.geometry} material={materials['750.001']} />
        <mesh geometry={nodes.house_water001_64.geometry} material={materials['Steel.001']} />
        <mesh geometry={nodes.house_water001_65.geometry} material={materials['Ceramic.001']} />
        <mesh geometry={nodes.house_water001_66.geometry} material={materials['shower_handle.001']} />
        <mesh
          geometry={nodes.house_water001_67.geometry}
          material={materials['Glass_sweethome3d_window_mirror_789.001']}
          material-transparent={true}
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes.house_water001_68.geometry} material={materials['Frame_out_frame_out_790.001']} />
        <mesh geometry={nodes.house_water001_69.geometry} material={materials['Frame_in_frame_in_1_791.001']} />
        <mesh geometry={nodes.house_water001_70.geometry} material={materials['red.001']} />
        <mesh geometry={nodes.house_water001_71.geometry} material={materials['flgrey.001']} />
        <mesh geometry={nodes.house_water001_72.geometry} material={materials['polotence_polot_821.001']} />
        <mesh geometry={nodes.house_water001_73.geometry} material={materials['822.001']} />
        <mesh geometry={nodes.house_water001_74.geometry} material={materials['bottom.001']} />
        <mesh geometry={nodes.house_water001_75.geometry} material={materials['top.001']} />
        <mesh geometry={nodes.house_water001_76.geometry} material={materials['left.001']} />
        <mesh geometry={nodes.house_water001_77.geometry} material={materials['right.001']} />
        <mesh geometry={nodes.house_water001_78.geometry} material={materials['back.001']} />
        <mesh geometry={nodes.house_water001_79.geometry} material={materials['front.001']} />
        <mesh geometry={nodes.house_water001_80.geometry} material={materials['cylinder.001']} />
        <mesh geometry={nodes.house_water001_81.geometry} material={materials['bottom_bottom_956.001']} />
        <mesh geometry={nodes.house_water001_82.geometry} material={materials['top_top_957.001']} />
        <mesh geometry={nodes.house_water001_83.geometry} material={materials['left_left_958.001']} />
        <mesh geometry={nodes.house_water001_84.geometry} material={materials['right_right_959.001']} />
        <mesh geometry={nodes.house_water001_85.geometry} material={materials['back_back_960.001']} />
        <mesh geometry={nodes.house_water001_86.geometry} material={materials['front_front_961.001']} />
        <mesh geometry={nodes.house_water001_87.geometry} material={materials['cylinder_cylinder_1004.001']} />
        <mesh geometry={nodes.house_water001_88.geometry} material={materials['bottom_bottom_1037.001']} />
        <mesh geometry={nodes.house_water001_89.geometry} material={materials['top_top_1038.001']} />
        <mesh geometry={nodes.house_water001_90.geometry} material={materials['left_left_1039.001']} />
        <mesh geometry={nodes.house_water001_91.geometry} material={materials['right_right_1040.001']} />
        <mesh geometry={nodes.house_water001_92.geometry} material={materials['back_back_1041.001']} />
        <mesh geometry={nodes.house_water001_93.geometry} material={materials['front_front_1042.001']} />
        <mesh geometry={nodes.house_water001_94.geometry} material={materials['cylinder_cylinder_1085.001']} />
        <mesh geometry={nodes.house_water001_95.geometry} material={materials['bottom_bottom_1142.001']} />
        <mesh geometry={nodes.house_water001_96.geometry} material={materials['top_top_1143.001']} />
        <mesh geometry={nodes.house_water001_97.geometry} material={materials['left_left_1144.001']} />
        <mesh geometry={nodes.house_water001_98.geometry} material={materials['right_right_1145.001']} />
        <mesh geometry={nodes.house_water001_99.geometry} material={materials['back_back_1146.001']} />
        <mesh geometry={nodes.house_water001_100.geometry} material={materials['front_front_1147.001']} />
        <mesh geometry={nodes.house_water001_101.geometry} material={materials['cylinder_cylinder_1232.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/house-water.glb')
