import { useState } from 'react';
// import { connect } from 'react-redux';
import { Canvas, extend } from '@react-three/fiber';
import * as THREE from 'three';
import {
  Box,
  OrbitControls,
  PerspectiveCamera,
  Plane,
} from '@react-three/drei';
import Obj from './Obj';
import { Person } from '../../types';
// import { getTree } from '../../redux/selectors';

interface AnimationProps {
  tree: Person[];
  onContexMenu: (e: any, item?: Person) => void;
  updatePositions: (item: Person, position: THREE.Vector3) => void;
}

function Animation(props: AnimationProps) {
  extend(THREE);
  const planeSize = 200;
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const { tree, onContexMenu, updatePositions } = props;
  const [dragging, setIsDragging] = useState(false);
  const [objDragging, setObjDragging] = useState<number | boolean>(false);
  const [backgroundColor] = useState('#0f601a');

  // const [ambientLightIntensity] = useState(Math.PI / 2);
  const [ambientLightIntensity] = useState(3);
  const [pointLightIntensity] = useState(3);
  const [pointLightPosition] = useState([0, 10, 0]);

  const handleDrag = (
    status: boolean,
    item: Person,
    position: THREE.Vector3,
  ) => {
    setIsDragging(status);
    updatePositions(item, position);
    if (!status) {
      setObjDragging(false);
    } else {
      setObjDragging(item.id);
    }
  };

  return (
    <Canvas onContextMenu={onContexMenu} shadows>
      <mesh>
        <PerspectiveCamera
          makeDefault
          position={[0, 100, 0]}
          near={1}
          fov={60}
        />
        <OrbitControls
          enablePan={!dragging}
          enableRotate={!dragging}
          panSpeed={0.5}
          minDistance={20}
          maxDistance={70}
          minPolarAngle={-Math.PI}
          maxPolarAngle={Math.PI / 4}
          zoomSpeed={1}
          zoomToCursor
        />
        {/* <gridHelper args={[50, 50, `white`, `red`]} /> */}
        <ambientLight intensity={ambientLightIntensity} />
        <pointLight
          position={pointLightPosition}
          decay={0}
          intensity={pointLightIntensity}
          castShadow
          position={[0, 30, (planeSize / 2) * -1]}
        />
        <group>
          {tree.map((item: Person) => {
            return (
              <group key={item.id}>
                <Obj
                  onDrag={handleDrag}
                  objDragging={objDragging}
                  onContexMenu={(e: any, it: Person) => {
                    setTimeout(() => {
                      onContexMenu(e, it);
                    }, 1);
                  }}
                  item={item}
                  id={item.id}
                  floorPlane={floorPlane}
                  key={item.id}
                  offset={planeSize}
                  tree={tree}
                />
              </group>
            );
          })}
        </group>
        <Plane
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          args={[planeSize, planeSize]}
        >
          <meshStandardMaterial attach="material" color={backgroundColor} />
        </Plane>
      </mesh>
    </Canvas>
  );
}

export default Animation;
