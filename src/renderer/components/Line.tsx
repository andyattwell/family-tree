import * as THREE from 'three';
import { useRef, useLayoutEffect } from 'react';
import { LineProps } from '../types';

export function Line({ start, end }: LineProps) {
  const ref = useRef();
  const strokeWidth = '30px';
  useLayoutEffect(() => {
    if (!ref.current || !ref.current.geometry) {
      return;
    }

    ref.current.geometry.setFromPoints(
      [start, end].map((point) => new THREE.Vector3(...point)),
    );
  }, [start, end]);
  return (
    <line ref={ref} width={strokeWidth}>
      <bufferGeometry />
      <lineBasicMaterial color="yellow" />
    </line>
  );
}

export function Lines({ item }) {
  return item.parents?.map((parent: Person) => {
    return (
      <mesh key={item.id + parent.id}>
        <Line
          start={[item.position.x, 0.1, item.position.z]}
          end={[parent.position.x, 0.1, item.position.z]}
        />
        <Line
          start={[parent.position.x, 0.1, item.position.z]}
          end={[parent.position.x, 0.1, parent.position.z]}
        />
      </mesh>
    );
  });
}