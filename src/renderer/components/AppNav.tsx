import { Navbar, Nav, NavLink, Image } from 'react-bootstrap';
import { Family } from '../types';
import FamilyService from '../services/FamilyService';
import AddPersonIcon from '../images/add-person.svg';

interface AppNavProps {
  trees: Family[];
  family: Family | undefined;
  onSelectFamily: (family: Family) => void;
  onAddTree: (e: any) => void;
  onAddPerson: (e: any | null) => void;
  onDeleteFamily: () => void;
  onShowPeople: () => void;
}

function AppNav(props: AppNavProps) {
  const {
    trees,
    onSelectFamily,
    onAddTree,
    onAddPerson,
    onDeleteFamily,
    onShowPeople,
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
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <NavLink onClick={onShowPeople} className="text-white">
          Menú
        </NavLink>
        {/* <Nav className="me-auto">
          <NavDropdown
            title={family ? family?.title : 'Familias'}
            id="basic-nav-dropdown"
          >
            {trees && trees.length
              ? trees.map((f) => {
                  return (
                    <NavDropdown.Item key={f.id + f.title}>
                      <Button
                        variant="outline"
                        onClick={() => {
                          onSelectFamily(f);
                        }}
                      >
                        {`${f.id} - ${f.title}`}
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={handleDeleteFamily}
                        title="Eliminar familia"
                      >
                        <Image src={RemoveFamilyIcon} />
                      </Button>
                    </NavDropdown.Item>
                  );
                })
              : ''}
            <NavDropdown.Item onClick={onAddTree}>Agregar</NavDropdown.Item>
          </NavDropdown>
        </Nav> */}
        {family?.id ? (
          <>
            <Nav className="">
              <NavLink
                onClick={addPerson}
                className="bg-success text-white"
                title="Agregar miembro"
              >
                <Image src={AddPersonIcon} />
              </NavLink>
            </Nav>
            {/* <Nav className="float-end">
              <NavLink
                onClick={handleDeleteFamily}
                className="bg-danger text-white"
                title="Eliminar familia"
              >
                <Image src={RemoveFamilyIcon} />
              </NavLink>
            </Nav> */}
          </>
        ) : (
          ''
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNav;
