import { Container, Navbar, NavDropdown, Nav, NavLink } from 'react-bootstrap';
import { Family } from '../types';

interface AppNavProps {
  trees: Family[];
  family: Family | null;
  onSelectFamily: (family: Family) => void;
  onAddTree: (e: any) => void;
  onAddPerson: (e: any | null) => void;
}

function AppNav(props: AppNavProps) {
  const {
    trees,
    onSelectFamily,
    onAddTree,
    onAddPerson,
    family = null,
  } = props;

  const addPerson = () => {
    onAddPerson({ familyID: family?.id });
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Arbol Familiar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <NavDropdown title="Familias" id="basic-nav-dropdown">
              {trees.map((f) => {
                return (
                  <NavDropdown.Item
                    onClick={() => {
                      onSelectFamily(f);
                    }}
                    key={f.title}
                  >
                    {f.title}
                  </NavDropdown.Item>
                );
              })}
              <NavDropdown.Item onClick={onAddTree}>Agregar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {family?.id ? (
            <Nav className="">
              <NavLink onClick={addPerson}>Add Person</NavLink>
            </Nav>
          ) : (
            ''
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNav;
