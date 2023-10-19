import { useGLTF } from '@react-three/drei'

// npx gltfjsx .\public\models\house-water.glb -T

export function Model(props) {
  const { nodes, materials } = useGLTF('./models/house-water-transformed.glb')
  Object.keys(materials).forEach((m) => {
    if (!['sink_faiance', 'white_409', 'Ceramic'].includes(m)) {
      materials[m].flatShading = true
    }
  })
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh
          geometry={nodes['house_water-2_1'].geometry}
          material={materials.ground_1}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes['house_water-2_2'].geometry}
          material={materials.wall_1_2}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes['house_water-2_3'].geometry}
          material={materials.room_58_344}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_4'].geometry} material={materials.Railing} />
        <mesh geometry={nodes['house_water-2_5'].geometry} material={materials.Frame} />
        <mesh geometry={nodes['house_water-2_6'].geometry} material={materials.Steps} />
        <mesh geometry={nodes['house_water-2_7'].geometry} material={materials['390']} />
        <mesh geometry={nodes['house_water-2_8'].geometry} material={materials['396']} />
        <mesh geometry={nodes['house_water-2_9'].geometry} material={materials['397']} />
        <mesh geometry={nodes['house_water-2_10'].geometry} material={materials['399']} />
        <mesh geometry={nodes['house_water-2_11'].geometry} material={materials.white} />
        <mesh geometry={nodes['house_water-2_12'].geometry} material={materials.Cube_140_402} />
        <mesh geometry={nodes['house_water-2_13'].geometry} material={materials.silver} />
        <mesh
          geometry={nodes['house_water-2_14'].geometry}
          material={materials.grey}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes['house_water-2_15'].geometry}
          material={materials.flltgrey}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_16'].geometry} material={materials.ltgrey} />
        <mesh geometry={nodes['house_water-2_17'].geometry} material={materials.white_409} />
        <mesh geometry={nodes['house_water-2_18'].geometry} material={materials.yellowbrt} />
        <mesh
          geometry={nodes['house_water-2_19'].geometry}
          material={materials.flltgrey_sweethome3d_window_pane_420}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes['house_water-2_20'].geometry}
          material={materials['default']}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_21'].geometry} material={materials.lighttan} />
        <mesh geometry={nodes['house_water-2_22'].geometry} material={materials.white_Cube_2_1_433} />
        <mesh
          geometry={nodes['house_water-2_23'].geometry}
          material={materials.Glass}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes['house_water-2_24'].geometry}
          material={materials.Glass_458}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_25'].geometry} material={materials.Lock} />
        <mesh geometry={nodes['house_water-2_26'].geometry} material={materials.Frame_in} />
        <mesh geometry={nodes['house_water-2_27'].geometry} material={materials.Cage_in} />
        <mesh geometry={nodes['house_water-2_28'].geometry} material={materials.Frame_out} />
        <mesh geometry={nodes['house_water-2_29'].geometry} material={materials.Cage_out} />
        <mesh
          geometry={nodes['house_water-2_30'].geometry}
          material={materials.flltgrey_sweethome3d_window_pane_479}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes['house_water-2_31'].geometry}
          material={materials.white_Fenetre_480}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_32'].geometry} material={materials.None} />
        <mesh
          geometry={nodes['house_water-2_33'].geometry}
          material={materials.white_13_526}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes['house_water-2_34'].geometry}
          material={materials.flltgrey_14_527}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh
          geometry={nodes['house_water-2_35'].geometry}
          material={materials.wall_1_4}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_36'].geometry} material={materials.flesh} />
        <mesh geometry={nodes['house_water-2_37'].geometry} material={materials.bottom} />
        <mesh geometry={nodes['house_water-2_38'].geometry} material={materials.top} />
        <mesh geometry={nodes['house_water-2_39'].geometry} material={materials.left} />
        <mesh geometry={nodes['house_water-2_40'].geometry} material={materials.right} />
        <mesh geometry={nodes['house_water-2_41'].geometry} material={materials.back} />
        <mesh geometry={nodes['house_water-2_42'].geometry} material={materials.front} />
        <mesh
          geometry={nodes['house_water-2_43'].geometry}
          material={materials.glassblutint}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_44'].geometry} material={materials.black} />
        <mesh geometry={nodes['house_water-2_45'].geometry} material={materials.cuero_granate} />
        <mesh geometry={nodes['house_water-2_46'].geometry} material={materials.patas_metal} />
        <mesh geometry={nodes['house_water-2_47'].geometry} material={materials.brown} />
        <mesh geometry={nodes['house_water-2_48'].geometry} material={materials.black_615} />
        <mesh geometry={nodes['house_water-2_49'].geometry} material={materials.white_618} />
        <mesh geometry={nodes['house_water-2_50'].geometry} material={materials.Oriental_rug} />
        <mesh geometry={nodes['house_water-2_51'].geometry} material={materials.carpet_627} />
        <mesh geometry={nodes['house_water-2_52'].geometry} material={materials.gray} />
        <mesh geometry={nodes['house_water-2_53'].geometry} material={materials.Bathmat} />
        <mesh geometry={nodes['house_water-2_54'].geometry} material={materials.flbrown} />
        <mesh geometry={nodes['house_water-2_55'].geometry} material={materials.brownskn} />
        <mesh geometry={nodes['house_water-2_56'].geometry} material={materials['636']} />
        <mesh geometry={nodes['house_water-2_57'].geometry} material={materials.Material_LakeMoraine} />
        <mesh geometry={nodes['house_water-2_58'].geometry} material={materials.Aluminium} />
        <mesh geometry={nodes['house_water-2_59'].geometry} material={materials['640']} />
        <mesh geometry={nodes['house_water-2_60'].geometry} material={materials['643']} />
        <mesh geometry={nodes['house_water-2_61'].geometry} material={materials.Picture_1} />
        <mesh geometry={nodes['house_water-2_62'].geometry} material={materials.Picture_5} />
        <mesh geometry={nodes['house_water-2_63'].geometry} material={materials['651']} />
        <mesh
          geometry={nodes['house_water-2_64'].geometry}
          material={materials.Aluminium_652}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_65'].geometry} material={materials.Material_Etretat} />
        <mesh geometry={nodes['house_water-2_66'].geometry} material={materials.black_656} />
        <mesh geometry={nodes['house_water-2_67'].geometry} material={materials.cueEnd} />
        <mesh geometry={nodes['house_water-2_68'].geometry} material={materials['658']} />
        <mesh geometry={nodes['house_water-2_69'].geometry} material={materials.cueFront} />
        <mesh geometry={nodes['house_water-2_70'].geometry} material={materials.cueBrass} />
        <mesh geometry={nodes['house_water-2_71'].geometry} material={materials.cueBody} />
        <mesh geometry={nodes['house_water-2_72'].geometry} material={materials.cueRubber} />
        <mesh geometry={nodes['house_water-2_73'].geometry} material={materials.cueTip} />
        <mesh geometry={nodes['house_water-2_74'].geometry} material={materials.ballCue} />
        <mesh geometry={nodes['house_water-2_75'].geometry} material={materials.ballN1} />
        <mesh geometry={nodes['house_water-2_76'].geometry} material={materials.ballN2} />
        <mesh geometry={nodes['house_water-2_77'].geometry} material={materials.ballN3} />
        <mesh geometry={nodes['house_water-2_78'].geometry} material={materials.ballN4} />
        <mesh geometry={nodes['house_water-2_79'].geometry} material={materials.ballN5} />
        <mesh geometry={nodes['house_water-2_80'].geometry} material={materials.ballN6} />
        <mesh geometry={nodes['house_water-2_81'].geometry} material={materials.ballN7} />
        <mesh geometry={nodes['house_water-2_82'].geometry} material={materials.ballN8} />
        <mesh geometry={nodes['house_water-2_83'].geometry} material={materials.ballN9} />
        <mesh geometry={nodes['house_water-2_84'].geometry} material={materials.ballN10} />
        <mesh geometry={nodes['house_water-2_85'].geometry} material={materials.ballN11} />
        <mesh geometry={nodes['house_water-2_86'].geometry} material={materials.ballN15} />
        <mesh geometry={nodes['house_water-2_87'].geometry} material={materials.ballN14} />
        <mesh geometry={nodes['house_water-2_88'].geometry} material={materials.ballN13} />
        <mesh geometry={nodes['house_water-2_89'].geometry} material={materials['Material.001']} />
        <mesh geometry={nodes['house_water-2_90'].geometry} material={materials.ballN12} />
        <mesh geometry={nodes['house_water-2_91'].geometry} material={materials.chrome} />
        <mesh geometry={nodes['house_water-2_92'].geometry} material={materials.felt} />
        <mesh geometry={nodes['house_water-2_93'].geometry} material={materials.GrisClair} />
        <mesh geometry={nodes['house_water-2_94'].geometry} material={materials.BoisClair} />
        <mesh
          geometry={nodes['house_water-2_95'].geometry}
          material={materials.Default_Texture}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_96'].geometry} material={materials.PAINT_gloss_black} />
        <mesh geometry={nodes['house_water-2_97'].geometry} material={materials.METAL_brass_polish} />
        <mesh geometry={nodes['house_water-2_98'].geometry} material={materials.METAL_aluminum} />
        <mesh
          geometry={nodes['house_water-2_99'].geometry}
          material={materials.GLASS}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_100'].geometry} material={materials.PAINT_gloss_white} />
        <mesh geometry={nodes['house_water-2_101'].geometry} material={materials.METAL_brass_polis} />
        <mesh geometry={nodes['house_water-2_102'].geometry} material={materials['785']} />
        <mesh geometry={nodes['house_water-2_103'].geometry} material={materials.Feet} />
        <mesh geometry={nodes['house_water-2_104'].geometry} material={materials.Material_Cube_787} />
        <mesh geometry={nodes['house_water-2_105'].geometry} material={materials.sofa} />
        <mesh geometry={nodes['house_water-2_106'].geometry} material={materials.negrepotes} />
        <mesh geometry={nodes['house_water-2_107'].geometry} material={materials.metall} />
        <mesh geometry={nodes['house_water-2_108'].geometry} material={materials.material_9} />
        <mesh geometry={nodes['house_water-2_109'].geometry} material={materials.material_10} />
        <mesh geometry={nodes['house_water-2_110'].geometry} material={materials.material_2} />
        <mesh geometry={nodes['house_water-2_111'].geometry} material={materials.material_3} />
        <mesh geometry={nodes['house_water-2_112'].geometry} material={materials.material_8} />
        <mesh geometry={nodes['house_water-2_113'].geometry} material={materials.material_1} />
        <mesh geometry={nodes['house_water-2_114'].geometry} material={materials.material_11} />
        <mesh geometry={nodes['house_water-2_115'].geometry} material={materials.material} />
        <mesh geometry={nodes['house_water-2_116'].geometry} material={materials.material_0} />
        <mesh geometry={nodes['house_water-2_117'].geometry} material={materials.material_6} />
        <mesh geometry={nodes['house_water-2_118'].geometry} material={materials.material_7} />
        <mesh geometry={nodes['house_water-2_119'].geometry} material={materials.material_4} />
        <mesh geometry={nodes['house_water-2_120'].geometry} material={materials.material_5} />
        <mesh geometry={nodes['house_water-2_121'].geometry} material={materials.archwhite} />
        <mesh geometry={nodes['house_water-2_122'].geometry} material={materials.sweethome3d_window_mirror_902} />
        <mesh geometry={nodes['house_water-2_123'].geometry} material={materials.aqua} />
        <mesh geometry={nodes['house_water-2_124'].geometry} material={materials.Rectangle04_1} />
        <mesh geometry={nodes['house_water-2_125'].geometry} material={materials.black_910} />
        <mesh geometry={nodes['house_water-2_126'].geometry} material={materials.sink_chrome} />
        <mesh geometry={nodes['house_water-2_127'].geometry} material={materials.sink_faiance} />
        <mesh geometry={nodes['house_water-2_128'].geometry} material={materials.chrome_dark} />
        <mesh geometry={nodes['house_water-2_129'].geometry} material={materials.White_ceramic} />
        <mesh geometry={nodes['house_water-2_130'].geometry} material={materials.White_plastic} />
        <mesh geometry={nodes['house_water-2_131'].geometry} material={materials.paper} />
        <mesh geometry={nodes['house_water-2_132'].geometry} material={materials.Cardboard} />
        <mesh geometry={nodes['house_water-2_133'].geometry} material={materials['941']} />
        <mesh geometry={nodes['house_water-2_134'].geometry} material={materials['942']} />
        <mesh geometry={nodes['house_water-2_135'].geometry} material={materials.None_943} />
        <mesh geometry={nodes['house_water-2_136'].geometry} material={materials['945']} />
        <mesh geometry={nodes['house_water-2_137'].geometry} material={materials.Steel} />
        <mesh geometry={nodes['house_water-2_138'].geometry} material={materials.Ceramic} />
        <mesh geometry={nodes['house_water-2_139'].geometry} material={materials.shower_handle} />
        <mesh
          geometry={nodes['house_water-2_140'].geometry}
          material={materials.Glass_sweethome3d_window_mirror_985}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
        <mesh geometry={nodes['house_water-2_141'].geometry} material={materials.Frame_out_frame_out_986} />
        <mesh geometry={nodes['house_water-2_142'].geometry} material={materials.Frame_in_frame_in_1_987} />
        <mesh geometry={nodes['house_water-2_143'].geometry} material={materials.red} />
        <mesh geometry={nodes['house_water-2_144'].geometry} material={materials.flgrey} />
        <mesh geometry={nodes['house_water-2_145'].geometry} material={materials['1009']} />
        <mesh geometry={nodes['house_water-2_146'].geometry} material={materials.polotence_polot_1017} />
        <mesh geometry={nodes['house_water-2_147'].geometry} material={materials['1018']} />
        <mesh geometry={nodes['house_water-2_148'].geometry} material={materials.bottom_bottom_1059} />
        <mesh geometry={nodes['house_water-2_149'].geometry} material={materials.top_top_1060} />
        <mesh geometry={nodes['house_water-2_150'].geometry} material={materials.left_left_1061} />
        <mesh geometry={nodes['house_water-2_151'].geometry} material={materials.right_right_1062} />
        <mesh geometry={nodes['house_water-2_152'].geometry} material={materials.back_back_1063} />
        <mesh geometry={nodes['house_water-2_153'].geometry} material={materials.front_front_1064} />
        <mesh geometry={nodes['house_water-2_154'].geometry} material={materials.cylinder} />
        <mesh geometry={nodes['house_water-2_155'].geometry} material={materials.bottom_bottom_1152} />
        <mesh geometry={nodes['house_water-2_156'].geometry} material={materials.top_top_1153} />
        <mesh geometry={nodes['house_water-2_157'].geometry} material={materials.left_left_1154} />
        <mesh geometry={nodes['house_water-2_158'].geometry} material={materials.right_right_1155} />
        <mesh geometry={nodes['house_water-2_159'].geometry} material={materials.back_back_1156} />
        <mesh geometry={nodes['house_water-2_160'].geometry} material={materials.front_front_1157} />
        <mesh geometry={nodes['house_water-2_161'].geometry} material={materials.bottom_bottom_1182} />
        <mesh geometry={nodes['house_water-2_162'].geometry} material={materials.top_top_1183} />
        <mesh geometry={nodes['house_water-2_163'].geometry} material={materials.left_left_1184} />
        <mesh geometry={nodes['house_water-2_164'].geometry} material={materials.right_right_1185} />
        <mesh geometry={nodes['house_water-2_165'].geometry} material={materials.back_back_1186} />
        <mesh geometry={nodes['house_water-2_166'].geometry} material={materials.front_front_1187} />
        <mesh geometry={nodes['house_water-2_167'].geometry} material={materials.bottom_bottom_1212} />
        <mesh geometry={nodes['house_water-2_168'].geometry} material={materials.top_top_1213} />
        <mesh geometry={nodes['house_water-2_169'].geometry} material={materials.left_left_1214} />
        <mesh geometry={nodes['house_water-2_170'].geometry} material={materials.right_right_1215} />
        <mesh geometry={nodes['house_water-2_171'].geometry} material={materials.back_back_1216} />
        <mesh geometry={nodes['house_water-2_172'].geometry} material={materials.front_front_1217} />
        <mesh
          geometry={nodes['house_water-2_173'].geometry}
          material={materials.cylinder_cylinder_1302}
          material-transparent
          material-opacity={0.2}
          material-depthWrite={false}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/house-water-transformed.glb')