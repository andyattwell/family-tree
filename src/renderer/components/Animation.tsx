import { useRef, useState, useLayoutEffect } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import Obj from './Obj';

interface Tree {
  uid: string;
  name: string;
  position: THREE.Vector3;
  parents: Array<Tree>;
  children: Array<Tree>;
}

interface Props {
  /** The text to display inside the button */
  tree: Array<Tree>;
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const { item } = props;
  const { position } = item;
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => {});

  function handleClick(e) {
    setActive(!active);
    // e.uuid
    console.log(e);
    props.onSelect();
  }

  return (
    <mesh position={position} ref={meshRef} onClick={handleClick}>
      <boxGeometry args={[1, 1, 1]} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
      <meshNormalMaterial attach="material" />
    </mesh>
  );
}

function CameraDolly() {
  const vec = new THREE.Vector3();
  useFrame((state) => {
    const step = 0.1;
    const x = 0;
    const y = 10;
    const z = 0;

    state.camera.position.lerp(vec.set(x, y, z), step);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });

  return null;
}

function Line({ start, end }) {
  const ref = useRef()
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="hotpink" />
    </line>
  );
}

export default function Animation({ tree }: Props) {
  const grid = useState(tree);
  const canvasRef = useRef();
  const [active, setActive] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prevMousePos, setPrevMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  extend(THREE);

  const [items, setItems] = useState([
    {
      position: [-1.2, 0, 0],
      id: 'item1',
    },
    {
      position: [1.2, 0, 0],
      id: 'item2',
    },
    {
      position: [3.6, 0, 2.4],
      id: 'item3',
      parents: ['item1', 'item2'],
    },
    {
      position: [3.6, 0, 4.8],
      id: 'item4',
      parents: ['item3'],
    },
  ]);

  function handleMove(e) {
    // screenX
    // screenY
    // clientX
    // clientY
    if (active) {
      // console.log('move', e.clientX, e.clientY);
      // console.log('move', e.pageX, e.pageY);
      const x = (mousePos.x - e.screenX) * -0.01;
      const y = (mousePos.y - e.screenY) * -0.01;
      const itms = items.map((item) => {
        if (item.id === active.id) {
          item.position = [item.position[0] + x, 0, item.position[2] + y];
        }
        return item;
      });
      setItems(itms);
      setMousePos({ x: e.screenX, y: e.screenY });
      // active.position = [x, 0, y];
    }
  }

  function handleSelect(item) {
    setActive(item);
  }

  function Lines() {
    return items.map((item) => {

      if (item.parents?.length) {
        return item.parents.map((p) => {
          const parent = items.find((i) => i.id === p);
          return (
            <>
              <Line
                key={item.id + p}
                start={[item.position[0], 0, item.position[2]]}
                end={[parent.position[0], 0, item.position[2]]}
              />
              <Line
                key={item.id + p + 2}
                start={[parent.position[0], 0, item.position[2]]}
                end={[parent.position[0], 0, parent.position[2]]}
              />
            </>
          );
        });
      }
    });
  }
  function handleDrag(props) {
    const { active, item, pos } = props;
    setActive(active);
    if (!active) {
      item.position = pos;
    }
  }
  // useLayoutEffect(() => {
  //   console.dir(canvasRef.current);
  // }, [canvasRef]);
  return (
    <Canvas onPointerMove={handleMove}>
      <OrthographicCamera makeDefault zoom={40} />
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        minZoom={10}
        maxZoom={50}
      />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeGeometry attach="geometry" args={[10, 10]} receiveShadow />
        <meshPhongMaterial
          attach="material"
          color="#ccc"
          side={THREE.DoubleSide}
          receiveShadow
        />
      </mesh>
      <gridHelper args={[10, 10, `white`, `gray`]} />
      {/* <ambientLight intensity={Math.PI / 2} /> */}
      {/* <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      /> */}
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      {items.map((item) => {
        return (
          // <Box
          //   key={item.id}
          //   item={item}
          //   onSelect={() => {
          //     handleSelect(item);
          //   }}
          // />
          <Obj
            setIsDragging={handleDrag}
            item={item}
            floorPlane={floorPlane}
            key={item.id}
          />
        );
      })}
      <Lines />
      <CameraDolly />
    </Canvas>
  );
}
