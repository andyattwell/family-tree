import { useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Obj from './Obj';
import { Family, Person } from '../../types';
import Background from './Background';

interface AnimationProps {
  tree: Person[];
  family: Family;
  onContexMenu: (e: any, item?: Person) => void;
  updatePositions: (item: Person, position: THREE.Vector3) => void;
}

function Animation(props: AnimationProps) {
  extend(THREE);
  const { tree, onContexMenu, updatePositions, family } = props;
  const [planeSizeWidth, setPlaneSizeWidth] = useState(100);
  const [planeSizeHeight, setPlaneSizeHeight] = useState(100);
  const [dragging, setIsDragging] = useState(false);
  const [objDragging, setObjDragging] = useState<number | boolean>(false);

  // const [ambientLightIntensity] = useState(Math.PI / 2);
  const [ambientLightIntensity] = useState(3);
  const [pointLightIntensity] = useState(3);
  const [pointLightPosition] = useState([0, 30, (planeSizeWidth / 2) * -1]);

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

  const handleBackgroundSizeChange = (width: number, height: number) => {
    let collition = false;
    tree.forEach((p: Person) => {
      if (p.position.x < -width / 2 || p.position.x > width / 2) {
        collition = true;
      } else if (p.position.z < -height / 2 || p.position.z > height / 2) {
        collition = true;
      }
    });
    if (!collition) {
      setPlaneSizeWidth(width);
      setPlaneSizeHeight(height);
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
          // enablePan={!dragging}
          enablePan={!dragging}
          enableRotate={false}
          // enableRotate={!dragging}
          panSpeed={0.5}
          minDistance={20}
          maxDistance={200}
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
                  key={item.id}
                  offsetX={planeSizeWidth}
                  offsetY={planeSizeHeight}
                  tree={tree}
                />
              </group>
            );
          })}
        </group>

        <Background
          color={family?.backgroundColor || '#0f601a'}
          width={planeSizeWidth}
          height={planeSizeHeight}
          onSizeChange={handleBackgroundSizeChange}
        />
      </mesh>
    </Canvas>
  );
}

export default Animation;
