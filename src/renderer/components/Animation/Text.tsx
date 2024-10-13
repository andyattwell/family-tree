import { Float, Text } from '@react-three/drei';
import { Vector3 } from 'three';

interface TextProps {
  text: string;
  position: Vector3;
  selected: boolean;
}
export default function ObjText(props: TextProps) {
  const { text, position, selected } = props;
  const paragraphs = [text];
  const width = 12;
  const height = 5;
  const fontSize = 1.3;
  const color = selected ? 'rgb(100,100,0,1)' : 'rgb(0,0,0)';
  return (
    <group position={position}>
      {paragraphs.map((paragraph) => {
        return (
          <Float rotationIntensity={0.2} floatIntensity={0.5} key={paragraph}>
            <Text
              color="white"
              anchorX="center"
              anchorY="middle"
              fontSize={fontSize}
              maxWidth={width - 3}
              position={[0, 0.2, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              textAlign="center"
            >
              <meshBasicMaterial color="white" fog={false} />
              {paragraph}
            </Text>
          </Float>
        );
      })}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry attach="geometry" args={[width, height]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}
