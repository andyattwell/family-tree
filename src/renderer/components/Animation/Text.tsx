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
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      {paragraphs.map((paragraph) => {
        return (
          <Float rotationIntensity={0.2} floatIntensity={0.5} key={paragraph}>
            <Text
              color="white"
              anchorX="center"
              anchorY="middle"
              fontSize={size}
              maxWidth={10}
            >
              <meshBasicMaterial color="white" fog={false} />
              {paragraph}
            </Text>
          </Float>
        );
      })}
      <mesh position={[0, 0, -0.8]}>
        <planeGeometry attach="geometry" args={[10, itemSize]} />
        <meshStandardMaterial color={'black'} />
      </mesh>
    </mesh>
  );
}
