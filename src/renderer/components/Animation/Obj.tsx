import { useEffect, useRef, useState } from 'react';
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
import Crest from './Crest';
import { Box } from '@react-three/drei';
import FamilyService from '../../services/FamilyService';

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
  const itemSize = 5;
  const posY = 1;
  const { onDrag, onContexMenu, floorPlane, item, offset, tree, objDragging } =
    props;
  const [pos, setPos] = useState(
    new THREE.Vector3(item.position.x, posY, item.position.z),
  );

  const planeIntersectPoint = new THREE.Vector3();
  const [spring, api] = useSpring(
    () => ({
      position: pos,
    }),
    [item],
  );
  const checkCollition = (nextPos: THREE.Vector3, target: THREE.Vector3) => {
    // Extract positions and sizes
    const obj1MinX = nextPos.x;
    const obj1MaxX = nextPos.x + itemSize;
    const obj1MinZ = nextPos.z;
    const obj1MaxZ = nextPos.z + itemSize;

    const obj2MinX = target.x;
    const obj2MaxX = target.x + itemSize;
    const obj2MinZ = target.z;
    const obj2MaxZ = target.z + itemSize;

    const overlapX = obj1MinX < obj2MaxX && obj1MaxX > obj2MinX;
    const overlapZ = obj1MinZ < obj2MaxZ && obj1MaxZ > obj2MinZ;
    // Return early if no collision
    if (!(overlapX && overlapZ)) {
      return false;
    }

    return true;
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
        let nextPos = new THREE.Vector3(posX, posY, posZ);
        let isColliding = false;
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          const nextX = Math.round(planeIntersectPoint.x);
          const nextZ = Math.round(planeIntersectPoint.z);
          if (nextX % itemSize <= 0) {
            posX = nextX;
          }
          if (nextZ % itemSize <= 0) {
            posZ = nextZ;
          }

          if (posX < (offset / 2) * -1) {
            posX = (offset / 2) * -1;
          } else if (posX > offset / 2) {
            posX = offset / 2;
          }
          if (posZ < (offset / 2) * -1) {
            posZ = (offset / 2) * -1;
          } else if (posZ > offset / 2) {
            posZ = offset / 2;
          }
          nextPos = new THREE.Vector3(posX, posY, posZ);

          tree.forEach((p: Person) => {
            if (p.id === item.id) {
              return;
            }
            const collition = checkCollition(nextPos, p.position);
            if (collition) {
              isColliding = true;
            }
          });
        }
        // const min = getMinPosition();
        // if (posZ < min) {
        //   posZ = min;
        // }

        if (!isColliding) {
          item.position = nextPos;
          setPos(nextPos);
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

  useEffect(() => {
    const saveData = setTimeout(() => {
      FamilyService.savePerson({ id: item.id, pos });
    }, 1000);

    return () => clearTimeout(saveData);
  }, [pos]);
  const handleContexMenu = (e) => {
    onContexMenu(e, item);
  };
  const boxRef = useRef();
  return (
    <group>
      <animated.mesh
        {...spring}
        {...bind()}
        castShadow
        onContextMenu={handleContexMenu}
      >
        <Photo img={item.photo} size={3.5} position={[0, 0.2, -0.5]} />
        <Crest />
        {/* <ObjText
          text={item.name || ''}
          position={new THREE.Vector3(0, 0.2, itemSize + 1)}
          size={1.3}
          itemSize={itemSize}
        /> */}
        {/* <Box
          castShadow
          receiveShadow
          position={[0, 0.1, 0]}
          scale={[itemSize, 1, itemSize]}
        >
          <meshStandardMaterial attach="material" color="orange" />
        </Box> */}
        {/* <boxGeometry args={dimentions} /> */}
        {/* <meshStandardMaterial color="orange" metalness={2} roughness={5} /> */}
        {/* <meshNormalMaterial attach="material" /> */}
      </animated.mesh>
      {item.parents ? (
        <Lines item={item} connections={item.parents} itemSize={itemSize} />
      ) : (
        ''
      )}
    </group>
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
