import { Float, Text } from '@react-three/drei';
import { Vector3 } from 'three';

interface TextProps {
  text: string;
  position: Vector3;
  size: number;
}
export default function ObjText(props: TextProps) {
  const { text, position, size } = props;
  const paragraphs = [text];
  return paragraphs.map((paragraph) => {
    return (
      <Float rotationIntensity={0.2} floatIntensity={0.5} key={paragraph}>
        <Text
          color="white"
          anchorX="center"
          anchorY="middle"
          fontSize={size}
          position={position}
          rotation={[-Math.PI / 2, 0, 0]}
          maxWidth={6}
        >
          <meshBasicMaterial color="white" fog={false} />
          {paragraph}
        </Text>
      </Float>
    );
  });
}
