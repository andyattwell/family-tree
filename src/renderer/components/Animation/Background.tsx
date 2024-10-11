import { animated, useSpring } from '@react-spring/three';
import { Plane } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { useEffect, useState } from 'react';
import { Vector3 } from 'three';
import * as THREE from 'three';

interface CornerProps {
  position: Vector3;
  onSizeChange: (active: boolean, x: number, z: number) => void;
  invertX: boolean;
  invertY: boolean;
  name: string;
}
function Corner(props: CornerProps) {
  const { position, onSizeChange, invertX, invertY } = props;
  const [spring, api] = useSpring(() => ({ position }), [position]);
  const floorPlane = new THREE.Plane(new Vector3(0, 1, 0), 0);
  const planeIntersectPoint = new Vector3();
  const bind = useDrag(
    ({ active, movement: [x, y], event }) => {
      try {
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        }
        const posX = Math.round(Math.abs(planeIntersectPoint.x)) * 2;
        const posZ = Math.round(Math.abs(planeIntersectPoint.z)) * 2;
        onSizeChange(active, posX, posZ);
        api.start({ position });
      } catch (error) {
        console.log('ERROR', error);
        // onDrag(false, item, pos);
      }
    },
    { delay: true },
  );

  return (
    <animated.mesh {...spring} {...bind()} castShadow>
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        // position={cPos}
        args={[4, 4]}
      >
        <meshStandardMaterial attach="material" color="red" />
      </Plane>
    </animated.mesh>
  );
}

interface BackgroundDragProps {
  position: Vector3;
  onPositionChange: (active: boolean, x: number, z: number) => void;
}
function BackgroundDrag(props: BackgroundDragProps) {
  const { position, onPositionChange } = props;
  const [spring, api] = useSpring(() => ({ position }), [position]);
  const floorPlane = new THREE.Plane(new Vector3(0, 1, 0), 0);
  const planeIntersectPoint = new Vector3();
  const bind = useDrag(
    ({ active, movement: [x, y], event }) => {
      try {
        let posX = planeIntersectPoint.x;
        let posZ = planeIntersectPoint.x;
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          posX = Math.round(planeIntersectPoint.x);
          posZ = Math.round(planeIntersectPoint.z);
        }
        onPositionChange(active, posX, posZ);
        api.start({ position });
      } catch (error) {
        console.log('ERROR', error);
      }
    },
    { delay: true },
  );

  return (
    <animated.mesh {...spring} {...bind()} castShadow>
      <Plane rotation={[-Math.PI / 2, 0, 0]} args={[4, 2]}>
        <meshStandardMaterial attach="material" color="red" />
      </Plane>
    </animated.mesh>
  );
}

interface BackgroundProps {
  color: string | undefined;
  width: number;
  height: number;
  position: Vector3;
  onSizeChange: (active: boolean, width: number, height: number) => void;
  onPositionChange: (active: boolean, x: number, z: number) => void;
}

function Background(props: BackgroundProps) {
  const { color, width, height, position, onSizeChange, onPositionChange } =
    props;
  const [backgroundColor, setBackgroundColor] = useState('#ffd60a');
  const [corners, setCorners] = useState<any>([]);

  useEffect(() => {
    const halfWidth = -width / 2;
    const halfHeight = -height / 2;
    const posY = position.y + 0.3;
    setCorners([
      {
        name: 'DownLeft',
        position: new Vector3(
          position.x - halfWidth - 2,
          posY,
          position.z - halfHeight - 2,
        ),
        invertX: true,
        invertY: true,
      },
      {
        name: 'UpLeft',
        position: new Vector3(
          position.x - halfWidth - 2,
          posY,
          position.z + halfHeight + 2,
        ),
        invertX: true,
        invertY: false,
      },
      {
        name: 'UpRight',
        position: new Vector3(
          position.x + halfWidth + 2,
          posY,
          position.z + halfHeight + 2,
        ),
        invertX: false,
        invertY: false,
      },
      {
        name: 'DownRight',
        position: new Vector3(
          position.x + halfWidth + 2,
          posY,
          position.z - halfHeight - 2,
        ),
        invertX: false,
        invertY: true,
      },
    ]);
  }, [width, height, position]);

  useEffect(() => {
    setBackgroundColor(color || '#ffd60a');
  }, [color]);

  const minWidth = 60;
  const maxWidth = 400;
  const minHeight = 60;
  const maxHeight = 400;

  const handleSizeChange = (active: boolean, x: number, z: number) => {
    let nextWidth = width;
    let nextHeight = height;
    if (active) {
      nextWidth = Math.min(Math.max(x, minWidth), maxWidth);
      nextHeight = Math.min(Math.max(z, minHeight), maxHeight);
    }
    onSizeChange(active, nextWidth, nextHeight);
  };

  const handlePositionChange = (active: boolean, x: number, z: number) => {
    onPositionChange(active, x, z + height / 2);
  };

  return (
    <group>
      <BackgroundDrag
        position={
          new Vector3(position.x, position.y + 0.5, position.z - height / 2)
        }
        onPositionChange={handlePositionChange}
      />
      {corners.map((corner: any) => {
        return (
          <group key={corner.name}>
            <Corner
              position={corner.position}
              onSizeChange={handleSizeChange}
              invertX={corner.invertX}
              invertY={corner.invertY}
              name={corner.name}
            />
          </group>
        );
      })}

      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={position}
        args={[width, height]}
      >
        <meshStandardMaterial attach="material" color={backgroundColor} />
      </Plane>
    </group>
  );
}
export default Background;
