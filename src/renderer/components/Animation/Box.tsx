

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
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      {/* <meshNormalMaterial attach="material" /> */}
    </mesh>
  );
}
