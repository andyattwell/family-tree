import { useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import Obj from './Obj';
import { Person } from '../types';
import { Lines } from './Line';
import { getMinPosition } from '../helpers';
import FamilyService from '../services/FamilyService';

// interface CameraProps {
//   position: THREE.Vector3;
// }

function CameraDolly() {
  const vec = new THREE.Vector3();
  useFrame((state) => {
    const step = 0.1;
    const y = 100;

    // state.camera.position.lerp(vec.set(position.x, y, position.z), step);
    state.camera.position.set(0, y, 0);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });

  return null;
}

interface AnimationProps {
  tree: Person[];
  onContexMenu: (e: any, item: Person) => void;
}

export default function Animation(props: AnimationProps) {
  extend(THREE);
  const [active, setActive] = useState(false);
  const planeSize = 100;
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(0, 40, 0),
  );
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const { tree, onContexMenu } = props;
  const [treeArr, setTreeArr] = useState(tree);

  const updatePositions = (item: Person, pos: THREE.Vector3) => {
    const treeCurr = [...treeArr];
    setTreeArr([]);
    treeCurr.map((person) => {
      if (person.id === item.id) {
        person.position = pos;
      }

      person.parents = person.parents?.map((parent) => {
        if (parent.id === item.id) {
          parent.position = pos;
        }
        return parent;
      });

      const min = getMinPosition(person, planeSize);
      if (person.position && person.position.z < min) {
        person.position.z = min;
      }
      FamilyService.savePerson({ id: person.id, position: person.position });
      return person;
    });
    setTimeout(() => {
      setTreeArr(treeCurr);
    }, 1);
  };

  const handleDrag = (status: boolean, item: Person, pos: THREE.Vector3) => {
    setActive(status);
    if (!status) {
      updatePositions(item, pos);
    }
  };

  const onAddPerson = (e: any, item: Person): void => {
    onContexMenu(e, item);
  };

  const objsRef = useRef();

  /// Canvas onPointerMove={handleMove}
  return (
    <Canvas>
      <mesh>
        <OrthographicCamera makeDefault zoom={7} />
        <OrbitControls
          target={new THREE.Vector3(0, 0, 0)}
          enablePan={false}
          enableRotate={false}
          minZoom={7}
          maxZoom={100}
        />
        <CameraDolly />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry
            attach="geometry"
            args={[planeSize, planeSize]}
            receiveShadow
          />
          <meshStandardMaterial color="#222" />
        </mesh>
        {/* <gridHelper args={[50, 50, `white`, `red`]} /> */}
        <ambientLight intensity={Math.PI / 2} />
        <pointLight
          position={[planeSize / 2, 10, planeSize / 2]}
          decay={0}
          intensity={Math.PI}
        />
        <mesh ref={objsRef}>
          {treeArr.map((item) => {
            return (
              <mesh key={item.id}>
                <Obj
                  setIsDragging={handleDrag}
                  onContexMenu={onContexMenu}
                  item={item}
                  floorPlane={floorPlane}
                  key={item.id}
                  offset={planeSize}
                />
                {item.parents ? <Lines item={item} /> : ''}
              </mesh>
            );
          })}
        </mesh>
      </mesh>
    </Canvas>
  );
}
