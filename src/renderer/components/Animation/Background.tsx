import { animated, useSpring } from '@react-spring/three';
import { Plane } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { useEffect, useState } from 'react';
import { Vector3 } from 'three';

interface CornerProps {
  position: Vector3;
  onSizeChange: (x: number, z: number) => void;
  invertX: boolean;
  invertY: boolean;
  name: string;
}
function Corner(props: CornerProps) {
  const { position, onSizeChange, invertX, invertY } = props;
  const [spring, api] = useSpring(() => ({ position }), [position]);

  const bind = useDrag(
    ({ active, movement: [x, y] }) => {
      try {
        if (active) {
          let posX = Math.round(x) * 0.01;
          let posZ = Math.round(y) * 0.01;
          posX *= invertX ? -1 : 1;
          posZ *= invertY ? -1 : 1;
          onSizeChange(posX, posZ);
        }
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

interface BackgroundProps {
  color: string;
  width: number;
  height: number;
  onSizeChange: (width: number, height: number) => void;
}

function Background(props: BackgroundProps) {
  const { color, width, height, onSizeChange } = props;
  const [backgroundColor] = useState(color);
  // const [planeWidth, setPlaneWidth] = useState(width);
  // const [planeHeight, setPlaneHeight] = useState(height);
  const [corners, setCorners] = useState<any>([]);

  useEffect(() => {
    setCorners([
      {
        name: 'UpLeft',
        position: new Vector3(-width / 2 + 2, 0.3, -height / 2 + 2),
        invertX: true,
        invertY: true,
      },
      {
        name: 'DownLeft',
        position: new Vector3(-width / 2 + 2, 0.3, height / 2 - 2),
        invertX: true,
        invertY: false,
      },
      {
        name: 'DownRight',
        position: new Vector3(width / 2 - 2, 0.3, height / 2 - 2),
        invertX: false,
        invertY: false,
      },
      {
        name: 'UpRight',
        position: new Vector3(width / 2 - 2, 0.3, -height / 2 + 2),
        invertX: false,
        invertY: true,
      },
    ]);
  }, [width, height]);

  const minWidth = 10;
  const minHeight = 10;

  const handleSizeChange = (x: number, z: number) => {
    let nextWidth = width;
    let nextHeight = height;
    if (width + x > minWidth) {
      nextWidth += x;
    }
    if (height + z > minHeight) {
      nextHeight += z;
    }
    // setPlaneWidth(nextWidth);
    // setPlaneHeight(nextHeight);
    onSizeChange(nextWidth, nextHeight);
  };

  return (
    <group>
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
        position={[0, 0, 0]}
        args={[width, height]}
      >
        <meshStandardMaterial attach="material" color={backgroundColor} />
      </Plane>
    </group>
  );
}
export default Background;
