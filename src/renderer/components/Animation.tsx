import { useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import Obj from './Obj';
import { Person } from '../types';
import { Lines } from './Line';

function CameraDolly() {
  const vec = new THREE.Vector3();
  useFrame((state) => {
    const step = 0.1;
    // const { x, y, z } = position;
    const x = 0;
    const y = 10;
    const z = 0;

    state.camera.position.lerp(vec.set(x, y, z), step);
    // state.camera.position.lerp(position, step);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });

  return null;
}

interface AnimationProps {
  tree: Person[];
  updatePositions: (item: Person, pos: THREE.Vector3) => void;
  onContexMenu: (e: any, item: Person) => void;
}

export default function Animation(props: AnimationProps) {
  const [active, setActive] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  extend(THREE);
  const { tree, updatePositions, onContexMenu } = props;

  const handleDrag = (status: boolean, item: Person, pos: THREE.Vector3) => {
    setActive(status);

    if (!status) {
      updatePositions(item, pos);
    }
  };

  const onAddPerson = (e: any, item: Person): void => {
    onContexMenu(e, item);
  };

  const planeSize = 100;
  /// Canvas onPointerMove={handleMove}
  return (
    <Canvas>
      <OrthographicCamera makeDefault zoom={40} />
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        minZoom={10}
        maxZoom={50}
      />
      <CameraDolly />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry
          attach="geometry"
          args={[planeSize, planeSize]}
          receiveShadow
        />
        {/* <meshPhongMaterial
          attach="material"
          color="red"
          side={THREE.DoubleSide}
          receiveShadow
        /> */}
        <meshStandardMaterial color="#222" />
        {/* <meshNormalMaterial attach="material" /> */}
      </mesh>
      <gridHelper args={[10, 10, `white`, `gray`]} />
      <ambientLight intensity={Math.PI / 2} />
      {/* <spotLight
        position={[3, 3, 3]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      /> */}
      <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
      {tree.map((item) => {
        return (
          <mesh key={item.id}>
            <Obj
              setIsDragging={handleDrag}
              onContexMenu={onContexMenu}
              item={item}
              floorPlane={floorPlane}
              key={item.id}
            />
            <Lines item={item} />
          </mesh>
        );
      })}
    </Canvas>
  );
}
