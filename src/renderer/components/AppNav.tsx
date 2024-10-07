import {
  Container,
  Navbar,
  NavDropdown,
  Nav,
  NavLink,
  Button,
} from 'react-bootstrap';
import { Family } from '../types';
import FamilyService from '../services/FamilyService';

interface AppNavProps {
  trees: Family[];
  family: Family | null;
  onSelectFamily: (family: Family) => void;
  onAddTree: (e: any) => void;
  onAddPerson: (e: any | null) => void;
  onDeleteFamily: () => void;
}

function AppNav(props: AppNavProps) {
  const {
    trees,
    onSelectFamily,
    onAddTree,
    onAddPerson,
    onDeleteFamily,
    family = null,
  } = props;

  const addPerson = () => {
    onAddPerson({ familyId: family?.id });
  };

  const handleDeleteFamily = () => {
    console.log('deleteFamily', family?.id);
    FamilyService.deleteFamily(family?.id)
      .then((r) => {
        console.log('deleteFamily then', r);
        onDeleteFamily();
        return null;
      })
      .catch((error) => {
        console.log('Error deleting family', error);
      });
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>{family?.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <NavDropdown title="Familias" id="basic-nav-dropdown">
              {trees && trees.length
                ? trees.map((f) => {
                    return (
                      <NavDropdown.Item
                        onClick={() => {
                          onSelectFamily(f);
                        }}
                        key={f.id + f.title}
                      >
                        {`${f.id} - ${f.title}`}
                      </NavDropdown.Item>
                    );
                  })
                : ''}
              <NavDropdown.Item onClick={onAddTree}>Agregar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {family?.id ? (
            <>
              <Nav className="">
                <NavLink onClick={addPerson} className="bg-success text-white">
                  Agregar miembro
                </NavLink>
              </Nav>
              <Nav className="float-end">
                <NavLink
                  onClick={handleDeleteFamily}
                  className="bg-danger text-white"
                >
                  Eliminar familia
                </NavLink>
              </Nav>
            </>
          ) : (
            ''
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNav;
