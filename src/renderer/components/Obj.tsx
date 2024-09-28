import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { getMinPosition } from '../helpers';
import { Person } from '../types';
import { Lines } from './Line';
import { updatePositions } from '../redux/actions';
import { getPersonById } from '../redux/selectors';

interface ObjProps {
  onDrag: (status: boolean, item: Person, pos: THREE.Vector3) => void;
  onContexMenu: (e: any, item: Person) => void;
  floorPlane: THREE.Plane;
  item: Person;
  id: number;
  offset: number;
  updatePositions: (
    id: number,
    x: number,
    y: number,
    z: number,
    offset: number,
  ) => void;
}

function Obj(props: ObjProps) {
  const { onDrag, onContexMenu, floorPlane, item, offset } = props;

  const [pos, setPos] = useState(
    new THREE.Vector3(item.position?.x, item.position?.y, item.position?.z),
  );
  // const [pos, setPos] = useState(item.position);
  const planeIntersectPoint = new THREE.Vector3();
  const [spring, api] = useSpring(
    () => ({
      // position: [0, 0, 0],
      position: new THREE.Vector3(
        item.position?.x,
        item.position?.y,
        item.position?.z,
      ),
      scale: 1,
      rotation: [0, 0, 0],
      config: { friction: 10 },
    }),
    [item],
  );

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      try {
        let posX = item.position?.x || 0;
        let posZ = item.position?.z || 0;
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);

          posX = planeIntersectPoint.x;
          posZ = planeIntersectPoint.z;
          const min = getMinPosition(item, offset);
          if (posZ < min) {
            posZ = min;
          }
          setPos(new THREE.Vector3(posX, 1, posZ));
        } else {
          console.log('not active');
        }
        onDrag(active, item, pos);
        props.updatePositions(item.id, pos.x, pos.y, pos.z, offset);
        // props.updatePositions(item.id, posX, 0.3, posZ, offset);

        api.start({
          position: pos,
        });
      } catch (error) {
        console.log('ERROR', error);
        onDrag(false);
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
        <boxGeometry args={[1, 1, 1]} />
        {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
        <meshNormalMaterial attach="material" />
      </animated.mesh>
      {item.parents ? <Lines item={item} /> : ''}
    </mesh>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const item = getPersonById(state, id);
  return { item };
};

// export default connect(null, { updatePositions })(Obj);
export default connect(mapStateToProps, { updatePositions })(Obj);
