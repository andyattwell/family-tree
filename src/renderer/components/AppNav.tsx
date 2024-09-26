import { useRef, useState } from 'react';
import {
  Container,
  Popover,
  Overlay,
  Navbar,
  NavDropdown,
  Nav,
} from 'react-bootstrap';
import { Family } from '../types';

interface AppNavProps {
  trees: Family[];
  onChangeTree: (family: Family) => void;
  onAdd: (e: any) => void;
}

export default function AppNav(props: AppNavProps) {
  const { trees, onChangeTree, onAdd } = props;
  const [showPop, setShowPop] = useState(false);
  const [target, setTarget] = useState();
  const familyName = useRef('');
  const navContainer = useRef();

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container ref={navContainer}>
        <Navbar.Brand>Arbol Familiar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <NavDropdown title="Familias" id="basic-nav-dropdown">
              {trees.map((family) => {
                return (
                  <NavDropdown.Item
                    onClick={() => {
                      onChangeTree(family);
                    }}
                    key={family.title}
                  >
                    {family.title}
                  </NavDropdown.Item>
                );
              })}
              <NavDropdown.Item onClick={onAdd}>Agregar</NavDropdown.Item>
            </NavDropdown>
            {/* <Overlay
              show={showPop}
              target={target}
              placement="bottom"
              container={navContainer.current}
              containerPadding={20}
            >
              {popover}
            </Overlay> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
