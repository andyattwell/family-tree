import * as THREE from 'three';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { LineProps, Person } from '../../types';

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

export function PlaneLine({ start, end }: LineProps) {
  const ref = useRef();
  const [position, setPosition] = useState<THREE.Vector3>();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    let w = Math.abs(start[0] - end[0]) + 0.25;
    let h = Math.abs(start[2] - end[2]);
    let x = start[0];
    let z = start[2];

    // if (w === 0) {
    //   w = 0.25;
    // } else {
    //   h = 0.25;
    // }

    if (w > h) {
      h = 0.25;
    } else {
      // w += 0.25;
      z = end[2] + h / 2;
      // x -= 0.25;
      // z += width / 2;
    }

    if (start[0] > end[0]) {
      x -= width / 2;
    } else {
      x += width / 2;
    }

    setWidth(w);
    setHeight(h);

    setPosition(new THREE.Vector3(x, start[1], z));
  }, [start, end]);

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach="geometry" args={[width, height]} receiveShadow />
      <meshStandardMaterial color="yeloow" />
    </mesh>
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

  const itemZ = (item.position?.z || 0) - 1.5;
  const y = 0.1;
  return parents.map((parent: Person) => {
    const key = (item.id || 0) + (parent.id || 0);

    return (
      <mesh key={key}>
        {/* <PlaneLine
          start={[item.position.x, y, itemZ]}
          end={[item.position.x, y, parent.position.z + 1.5]}
        />
        <PlaneLine
          start={[item.position.x + 0.25, y, parent.position.z + 1.5]}
          end={[parent.position.x + 0.25, y, parent.position.z + 1.5]}
        />
        <PlaneLine
          start={[parent.position.x, y, parent.position.z]}
          end={[parent.position.x, y, parent.position.z + 0.81]}
        /> */}
        <Line
          start={[item.position.x, y, itemZ]}
          end={[item.position.x, y, parent.position.z + 2]}
        />
        <Line
          start={[item.position.x, y, parent.position.z + 2]}
          end={[parent.position.x, y, parent.position.z + 2]}
        />
        <Line
          start={[parent.position.x, y, parent.position.z + 1]}
          end={[parent.position.x, y, parent.position.z + 2]}
        />
      </mesh>
    );
  });
}
