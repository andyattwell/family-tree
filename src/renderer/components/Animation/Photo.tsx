import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { Circle } from '@react-three/drei';
import logo from '../../images/person2.png';

interface PhotoProps {
  img: string | undefined;
  size: number;
  position: THREE.Vector3;
}

export default function Photo({ img, size, position }: PhotoProps) {
  const texture = useLoader(THREE.TextureLoader, img || logo);
  return (
    <Circle
      rotation={[-Math.PI / 2, 0, 0]}
      position={position}
      castShadow
      receiveShadow
      args={[size / 2, 24]}
    >
      <meshStandardMaterial attach="material" map={texture} />
    </Circle>
  );
}
