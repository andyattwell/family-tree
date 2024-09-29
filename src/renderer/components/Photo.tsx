import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import logo from '../images/person.png';

export default function Photo({ img }: { img: string | undefined }) {
  const texture = useLoader(THREE.TextureLoader, img || logo);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}
