import { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { Person } from '../../types';
import { Lines } from './Line';
// import { updatePositions } from '../../redux/actions';
// import { getPersonById } from '../../redux/selectors';
import ObjText from './Text';
import Photo from './Photo';

interface ObjProps {
  onDrag: (status: boolean, item: Person, pos: THREE.Vector3) => void;
  onContexMenu: (e: any, item: Person) => void;
  floorPlane: THREE.Plane;
  item: Person;
  id: number;
  offset: number;
  tree: Person[];
  objDragging: number | boolean;
  // updatePositions: (
  //   id: number,
  //   x: number,
  //   y: number,
  //   z: number,
  //   offset: number,
  // ) => void;
}

function Obj(props: ObjProps) {
  const itemSize = 2;
  const { onDrag, onContexMenu, floorPlane, item, offset, tree, objDragging } =
    props;
  const [pos, setPos] = useState(
    new THREE.Vector3(item.position.x, item.position.y, item.position.z),
  );

  const planeIntersectPoint = new THREE.Vector3();
  const [spring, api] = useSpring(
    () => ({
      position: pos,
    }),
    [item],
  );

  const checkCollition = (target: Person) => {
    if (target.id === item.id) {
      return false;
    }
    // Rectangle vs Rectangle
    const halfWidth = itemSize / 2;
    const halfHeight = itemSize / 2;

    const centerX1 = item.position.x + halfWidth;
    const centerY1 = item.position.z + halfHeight;

    const centerX2 = target.position.x + halfWidth;
    const centerY2 = target.position.z + halfHeight;

    const dx = Math.abs(centerX1 - centerX2);
    const dy = Math.abs(centerY1 - centerY2);
    const collidingX = dx <= itemSize;
    const collidingY = dy <= itemSize;
    if (collidingX && collidingY) {
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Normalize the direction vector
      const direction = { x: (dx / distance) * -1, y: (dy / distance) * -1 };
      return {
        collidingX,
        collidingY,
        direction,
        dx,
        dy,
        target,
        x:
          item.position.x > target.position.x
            ? target.position.x + itemSize
            : item.position.x,

        z:
          item.position.z > target.position.z
            ? target.position.z + itemSize
            : item.position.z,
      };
    }
    return false;
  };

  const checkCollition2 = (target: Person) => {
    if (target.id === item.id) {
      return { isColliding: false, side: null };
    }
    // Extract positions and sizes
    const obj1MinX = item.position.x;
    const obj1MaxX = item.position.x + itemSize;
    const obj1MinZ = item.position.z;
    const obj1MaxZ = item.position.z + itemSize;

    const obj2MinX = target.position.x;
    const obj2MaxX = target.position.x + itemSize;
    const obj2MinZ = target.position.z;
    const obj2MaxZ = target.position.z + itemSize;

    const overlapX = obj1MinX < obj2MaxX && obj1MaxX > obj2MinX;
    const overlapZ = obj1MinZ < obj2MaxZ && obj1MaxZ > obj2MinZ;
    // Return early if no collision
    if (!(overlapX && overlapZ)) {
      return { isColliding: false, side: null };
    }
    // Determine the side of collision relative to obj1
    let side = null;

    const overX = obj2MaxX - item.position.x;
    const overZ = obj2MaxZ - item.position.z;

    // if (obj1MaxX <= obj2MaxX) {
    //   side = 'left';
    // }
    // // If obj2 is to the left of obj1
    // else if (obj1MinX >= obj2MinX) {
    //   side = 'right';
    // }
    // If obj2 is below obj1 (in terms of z)
    if (obj1MinX >= obj2MaxZ) {
      side = 'top'; // Since Z increases upwards
    }
    // If obj2 is above obj1 (in terms of z)
    else if (obj2MaxZ <= obj1MinZ) {
      side = 'bottom'; // Since Z decreases downwards
    }
    console.log({ side });

    // console.log({ obj2MinX, obj2MaxX, obj1MinX, obj1MaxX });
    // console.log({ side });

    return {
      isColliding: true,
      side,
      target,
      overX,
      overZ,
    };
  };

  const getMinPosition = () => {
    let min = -offset;
    if (item.parents) {
      item.parents.forEach((p) => {
        const relativeZ = (p.position?.z || 0) + itemSize * 2;
        if (relativeZ > min) {
          min = relativeZ;
        }
      });
    }
    return min;
  };

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (objDragging && objDragging !== item.id) {
        return;
      }
      try {
        let posX = item.position.x;
        let posZ = item.position.z;
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          posX = planeIntersectPoint.x;
          posZ = planeIntersectPoint.z;
          // const collitions = tree
          //   .map((person: Person) => checkCollition2(person))
          //   .filter((collition: any) => collition.isColliding)[0];
          // if (collitions) {
          //   // posX += collitions.overX;
          //   // posZ += collitions.overZ;
          // }
          const min = getMinPosition();
          if (posZ < min) {
            posZ = min;
          }
          setPos(new THREE.Vector3(posX, 1, posZ));
          item.position = pos;
        }

        onDrag(active, item, pos);

        api.start({
          position: pos,
        });
      } catch (error) {
        console.log('ERROR', error);
        onDrag(false, item, pos);
      }

      return timeStamp;
    },
    { delay: true },
  );

  const handleContexMenu = (e) => {
    onContexMenu(e, item);
  };

  return (
    <mesh>
      <animated.mesh
        {...spring}
        {...bind()}
        castShadow
        onContextMenu={handleContexMenu}
      >
        <Photo img={item.photo} size={itemSize} />

        <ObjText
          text={item.name || ''}
          position={new THREE.Vector3(0, 0, itemSize + 0.2)}
          size={itemSize * 0.4}
        />
        {/* <boxGeometry args={dimentions} /> */}
        <meshStandardMaterial color="orange" metalness={2} roughness={5} />
        {/* <meshNormalMaterial attach="material" /> */}
      </animated.mesh>
      {item.parents ? <Lines item={item} /> : ''}
    </mesh>
  );
}

// const mapStateToProps = (state, ownProps) => {
//   const { id } = ownProps;
//   const item = getPersonById(state, id);
//   return { item };
// };

// export default connect(null, { updatePositions })(Obj);
// export default connect(mapStateToProps)(Obj);
export default Obj;
