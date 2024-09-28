import { connect } from 'react-redux';
import { Canvas, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Obj from './Obj';
import { Person } from '../types';
import { getTree } from '../redux/selectors';
import FamilyService from '../services/FamilyService';

interface AnimationProps {
  tree: Person[];
  onContexMenu: (e: any, item: Person) => void;
}

function Animation(props: AnimationProps) {
  extend(THREE);
  const planeSize = 100;
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const { tree, onContexMenu } = props;

  const handleDrag = (
    status: boolean,
    item: Person,
    position: THREE.Vector3,
  ) => {
    if (!status) {
      FamilyService.savePerson({ id: item.id, position });
    }
  };

  return (
    <Canvas>
      <mesh>
        <PerspectiveCamera makeDefault zoom={5} position={[0, 100, 0]} />
        <OrbitControls
          // enablePan={false}
          // enableRotate={false}
          minZoom={7}
          maxZoom={15}
        />
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
        {/* <gridHelper args={[50, 50, `white`, `red`]} /> */}
        <ambientLight intensity={Math.PI / 2} />
        <pointLight
          position={[planeSize / 2, 10, planeSize / 2]}
          decay={0}
          intensity={Math.PI}
        />
        <mesh>
          {Object.keys(tree).map((id: any, k: any, o: any) => {
            const item = tree[id];
            return (
              <mesh key={item.id}>
                <Obj
                  onDrag={handleDrag}
                  onContexMenu={onContexMenu}
                  // item={item}
                  id={item.id}
                  floorPlane={floorPlane}
                  key={item.id}
                  offset={planeSize}
                  position={item.position}
                />
              </mesh>
            );
          })}
        </mesh>
      </mesh>
    </Canvas>
  );
}

const mapStateToProps = (state) => {
  const tree = getTree(state);
  return { tree };
};

// export default TodoList;
export default connect(mapStateToProps)(Animation);
