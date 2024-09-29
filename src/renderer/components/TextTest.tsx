import { Float, Text } from '@react-three/drei';

export default function TextTest({ text }: { text: string }) {
  const paragraphs = [text];
  return paragraphs.map((paragraph) => {
    return (
      <Float rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          color="white"
          anchorX="center"
          anchorY="middle"
          fontSize={0.3}
          position={[0, 0, 0.8]}
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
