import React, { useState, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Obj({ setIsDragging, floorPlane, item }) {
  const [pos, setPos] = useState(item?.position || [0, 1, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const planeIntersectPoint = new THREE.Vector3();

  const dragObjectRef = useRef();

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 },
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, 1.5, planeIntersectPoint.z]);
      }

      setIsDragging({ active, item, pos });

      api.start({
        // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position: pos,
        scale: active ? 1.2 : 1,
        // rotation: [y / aspect, x / aspect, 0],
      });
      return timeStamp;
    },
    { delay: true },
  );

  return (
    <animated.mesh {...spring} {...bind()} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
      <meshNormalMaterial attach="material" />
    </animated.mesh>
  );
}
