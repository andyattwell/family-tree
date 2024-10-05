import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import logo from '../../images/person.png';

interface PhotoProps {
  img: string | undefined;
  size: number;
}

export default function Photo({ img, size }: PhotoProps) {
  const texture = useLoader(THREE.TextureLoader, img || logo);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
      <planeGeometry attach="geometry" args={[size, size]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}
