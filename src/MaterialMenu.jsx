import { Hud, OrthographicCamera, Environment } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import Button from './Button'

export default function MaterialMenu({ setSelected }) {
  const texture = useLoader(TextureLoader, [
    './img/fabric_pattern_05.jpg',
    './img/leather_red.jpg',
    './img/fabric_pattern_07.jpg',
    './img/book_pattern.jpg',
    './img/denim_fabric_02.jpg'
  ])

  return (
    <Hud>
      <OrthographicCamera makeDefault position={[0, 0, 2]} zoom={50} />
      <Environment preset="forest" />
      <Button id={0} texture={texture[0]} position={[-6, -6, 0]} setSelected={setSelected} />
      <Button id={1} texture={texture[1]} position={[-3, -6, 0]} roughness={0.2} setSelected={setSelected} />
      <Button id={2} texture={texture[2]} position={[-0, -6, 0]} setSelected={setSelected} />
      <Button id={3} texture={texture[3]} position={[3, -6, 0]} roughness={0.5} setSelected={setSelected} />
      <Button id={4} texture={texture[4]} position={[6, -6, 0]} setSelected={setSelected} />
    </Hud>
  )
}
