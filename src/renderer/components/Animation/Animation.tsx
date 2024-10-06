import { useState } from 'react';
// import { connect } from 'react-redux';
import { Canvas, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Obj from './Obj';
import { Person } from '../../types';
// import { getTree } from '../../redux/selectors';
import FamilyService from '../../services/FamilyService';

interface AnimationProps {
  tree: Person[];
  onContexMenu: (e: any, item: Person) => void;
  updatePositions: (item: Person, position: THREE.Vector3) => void;
}

function Animation(props: AnimationProps) {
  extend(THREE);
  const planeSize = 100;
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const { tree, onContexMenu, updatePositions } = props;
  const [dragging, setIsDragging] = useState(false);
  const [objDragging, setObjDragging] = useState<number | boolean>(false);
  const handleDrag = (
    status: boolean,
    item: Person,
    position: THREE.Vector3,
  ) => {
    setIsDragging(status);
    updatePositions(item, position);
    if (!status) {
      FamilyService.savePerson({ id: item.id, position });
      setObjDragging(false);
    } else {
      setObjDragging(item.id);
    }
  };

  return (
    <Canvas>
      <mesh>
        <PerspectiveCamera
          makeDefault
          zoom={5}
          position={[0, 100, 0]}
          near={0.1}
        />
        <OrbitControls
          enablePan={!dragging}
          enableRotate={false}
          panSpeed={0.25}
          minZoom={100}
          maxZoom={15}
          zoomToCursor
        />
        {/* <gridHelper args={[50, 50, `white`, `red`]} /> */}
        <ambientLight intensity={Math.PI / 2} />
        <pointLight
          position={[planeSize / 2, 10, planeSize / 2]}
          decay={0}
          intensity={Math.PI}
        />
        <mesh>
          {tree.map((item: Person) => {
            // const item = tree[id];
            return (
              <mesh key={item.id}>
                <Obj
                  onDrag={handleDrag}
                  objDragging={objDragging}
                  onContexMenu={onContexMenu}
                  item={item}
                  id={item.id}
                  floorPlane={floorPlane}
                  key={item.id}
                  offset={planeSize}
                  tree={tree}
                />
              </mesh>
            );
          })}
        </mesh>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry
            attach="geometry"
            args={[planeSize, planeSize]}
            receiveShadow
          />
          <meshStandardMaterial color="#222" />
        </mesh>
      </mesh>
    </Canvas>
  );
}

const mapStateToProps = (state) => {
  // const tree = getTree(state);
  // return { tree };
};

export default Animation;
// export default connect(mapStateToProps)(Animation);
