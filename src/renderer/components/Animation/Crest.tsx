import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Mesh } from 'three';

import model from '../../models/escudo.obj';
import mat from '../../models/escudo.mtl';

export default function Crest({ selected }: { selected: boolean }) {
  const material = useLoader(MTLLoader, mat);
  const obj = useLoader(OBJLoader, model, (loader: any) => {
    material.preload();
    loader.setMaterials(material);
  });
  if (obj) {
    obj.castShadow = true;
    obj.traverse((children: any) => {
      if (children instanceof Mesh) {
        children.castShadow = true;
      }
    });
  }
  const size = selected ? 3 : 2;
  return (
    <mesh position={[0, 0, 0]} scale={[size, size, size]} castShadow>
      <primitive object={obj.clone()} />
    </mesh>
  );
}
