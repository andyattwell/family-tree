import { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import getMinPosition from '../helpers';
import { Person } from '../types';

interface ObjProps {
  setIsDragging: (status: boolean, item: Person, pos: THREE.Vector3) => void;
  onContexMenu: (e: any, item: Person) => void;
  floorPlane: THREE.Plane;
  item: Person;
}

export default function Obj(props: ObjProps) {
  const { setIsDragging, onContexMenu, floorPlane, item } = props;

  const [pos, setPos] = useState(
    new THREE.Vector3(item.position.x, 0.3, item.position.z),
  );
  const planeIntersectPoint = new THREE.Vector3();

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 },
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      try {
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);

          let posX = planeIntersectPoint.x;
          let posZ = planeIntersectPoint.z;
          // Check that y is not lower than it's parents
          const min = getMinPosition(item);
          if (posZ < min) {
            posZ = min;
          }

          setPos(new THREE.Vector3(posX, 0.3, posZ));
        }

        setIsDragging(active, item, pos);

        api.start({
          position: pos,
        });
      } catch (error) {
        console.log('ERROR', error);
        setIsDragging(false);
      }

      return timeStamp;
    },
    { delay: true },
  );

  const handleContexMenu = (e) => {
    onContexMenu(e, item);
  };

  return (
    <animated.mesh
      {...spring}
      {...bind()}
      test={item.id}
      castShadow
      onContextMenu={handleContexMenu}
    >
      <boxGeometry args={[1, 1, 1]} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
      <meshNormalMaterial attach="material" />
    </animated.mesh>
  );
}
