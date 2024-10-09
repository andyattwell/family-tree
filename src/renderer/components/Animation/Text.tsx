import { Float, Text } from '@react-three/drei';
import { Vector3 } from 'three';

interface TextProps {
  text: string;
  position: Vector3;
  size: number;
  itemSize: number;
}
export default function ObjText(props: TextProps) {
  const { text, position, size, itemSize } = props;
  const paragraphs = [text];
  return (
    <group position={position}>
      {paragraphs.map((paragraph) => {
        return (
          <Float rotationIntensity={0.2} floatIntensity={0.5} key={paragraph}>
            <Text
              color="white"
              anchorX="center"
              anchorY="middle"
              fontSize={size}
              maxWidth={10}
              position={[0, 0.2, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <meshBasicMaterial color="white" fog={false} />
              {paragraph}
            </Text>
          </Float>
        );
      })}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry attach="geometry" args={[10, itemSize]} />
        <meshStandardMaterial color={'black'} />
      </mesh>
    </group>
  );
}
