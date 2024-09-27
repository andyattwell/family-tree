import { useEffect, useState } from 'react';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { getMinPosition } from '../helpers';
import { Person } from '../types';

interface ObjProps {
  setIsDragging: (status: boolean, item: Person, pos: THREE.Vector3) => void;
  onContexMenu: (e: any, item: Person) => void;
  floorPlane: THREE.Plane;
  item: Person;
  offset: number;
}

export default function Obj(props: ObjProps) {
  const { setIsDragging, onContexMenu, floorPlane, item, offset } = props;

  let x = 0;
  let z = 0;

  if (item.position) {
    x = item.position.x;
    z = item.position.z;
  }

  const [pos, setPos] = useState(new THREE.Vector3(x, 0.3, z));
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

          const posX = planeIntersectPoint.x;
          let posZ = planeIntersectPoint.z;
          const min = getMinPosition(item, offset);
          if (posZ < min) {
            posZ = min;
          }
          setPos(new THREE.Vector3(posX, 1, posZ));
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
