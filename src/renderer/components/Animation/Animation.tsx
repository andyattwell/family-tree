import { useEffect, useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Obj from './Obj';
import { Family, Person } from '../../types';
import Background from './Background';
import FamilyService from '../../services/FamilyService';

interface AnimationProps {
  tree: Person[];
  family: Family;
  onContexMenu: (e: any, item?: Person) => void;
  updatePositions: (item: Person, position: THREE.Vector3) => void;
  onUpdateFamily: (family: Family) => void;
}

function Animation(props: AnimationProps) {
  extend(THREE);
  const { tree, onContexMenu, updatePositions, family, onUpdateFamily } = props;
  const [planeSizeWidth, setPlaneSizeWidth] = useState(100);
  const [planeSizeHeight, setPlaneSizeHeight] = useState(100);
  const [backgroundPosition, setBackgroundPosition] = useState(
    new THREE.Vector3(0, 1, 0),
  );
  const [dragging, setIsDragging] = useState(false);
  const [objDragging, setObjDragging] = useState<number | boolean>(false);

  // const [ambientLightIntensity] = useState(Math.PI / 2);
  const [ambientLightIntensity] = useState(3);
  const [pointLightIntensity] = useState(3);
  const [pointLightPosition] = useState([0, 30, (planeSizeWidth / 2) * -1]);

  const [bgModified, setBgModified] = useState(false);

  // console.log({ family });
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

  const handleBackgroundSizeChange = (
    active: boolean,
    width: number,
    height: number,
  ) => {
    setIsDragging(active);
    if (!active) {
      return;
    }
    let collitionX = false;
    let collitionY = false;
    tree.forEach((p: Person) => {
      if (
        p.position.x < backgroundPosition.x - width / 2 ||
        p.position.x > backgroundPosition.x + width / 2
      ) {
        collitionX = true;
      }
      if (
        p.position.z < backgroundPosition.z - height / 2 ||
        p.position.z > backgroundPosition.z + height / 2
      ) {
        collitionY = true;
      }
    });

    setBgModified(true);
    if (!collitionX) {
      setPlaneSizeWidth(width);
    }
    if (!collitionY) {
      setPlaneSizeHeight(height);
    }
  };

  const handlePositionChange = (active: boolean, x: number, z: number) => {
    setIsDragging(active);
    if (!active) {
      return;
    }
    const newPos = new THREE.Vector3(
      backgroundPosition.x,
      1,
      backgroundPosition.z,
    );

    let collitionX = false;
    let collitionY = false;
    tree.forEach((p: Person) => {
      if (
        p.position.x < x - planeSizeWidth / 2 ||
        p.position.x > x + planeSizeWidth / 2
      ) {
        collitionX = true;
      }
      if (
        p.position.z < z - planeSizeHeight / 2 ||
        p.position.z > z + planeSizeHeight / 2
      ) {
        collitionY = true;
      }
    });
    if (!collitionX) {
      newPos.x = x;
    }
    if (!collitionY) {
      newPos.z = z;
    }

    setBgModified(true);
    setBackgroundPosition(newPos);
  };

  useEffect(() => {
    setBgModified(false);
    setPlaneSizeWidth(family.backgroundSize?.width || 100);
    setPlaneSizeHeight(family.backgroundSize?.height || 100);
    const pos = new THREE.Vector3(0, 0, 0);
    if (family.backgroundPosition) {
      pos.x = family.backgroundPosition.x;
      pos.y = 1;
      pos.z = family.backgroundPosition.z;
    }
    setBackgroundPosition(pos);
  }, [family]);

  useEffect(() => {
    const saveData = setTimeout(() => {
      if (!bgModified) {
        return;
      }
      FamilyService.updateFamily({
        id: family.id,
        backgroundSize: { width: planeSizeWidth, height: planeSizeHeight },
        backgroundPosition,
      })
        .then((response: any) => {
          onUpdateFamily(response);
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 300);

    return () => clearTimeout(saveData);
  }, [planeSizeWidth, planeSizeHeight, backgroundPosition]);

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
          enableRotate={!dragging}
          // enableRotate={!dragging}
          panSpeed={0.5}
          minDistance={10}
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
          color={family.backgroundColor}
          width={planeSizeWidth}
          height={planeSizeHeight}
          onSizeChange={handleBackgroundSizeChange}
          onPositionChange={handlePositionChange}
          position={backgroundPosition}
        />
      </mesh>
    </Canvas>
  );
}

export default Animation;
