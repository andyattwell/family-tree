import * as THREE from 'three';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { LineProps, Person } from '../types';

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

export function Lines({ item }: { item: Person }) {
  const [parents, setParents] = useState<Person[]>([]);

  useEffect(() => {
    if (item.parents && typeof item.parents === 'object') {
      setParents(item.parents);
    } else {
      setParents([]);
    }
  }, [item]);

  return parents.map((parent: Person) => {
    if (!parent.position) {
      return '';
    }
    const childStart = (item.position?.z || 0) - 1;
    return (
      <mesh key={item?.id + parent.id}>
        <Line
          start={[item.position?.x || 0, 0.1, item.position?.z]}
          end={[item.position?.x || 0, 0.1, childStart]}
        />
        <Line
          start={[item.position?.x, 0.1, childStart]}
          end={[parent.position.x, 0.1, childStart]}
        />
        <Line
          start={[parent.position.x, 0.1, childStart]}
          end={[parent.position.x, 0.1, parent.position?.z]}
        />
      </mesh>
    );
  });
}
