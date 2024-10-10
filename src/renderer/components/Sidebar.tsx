import { Button } from 'react-bootstrap';
import { Person } from '../types';
import PersonaForm from './PersonaForm';
import { useEffect, useState } from 'react';
import PeopleList from './PeopleList';

interface Props {
  show: boolean;
  onClose: (arg?: any) => void;
  onSelectFamily: (family: Family) => void;
  persona?: Person;
  family?: Family;
}

function Sidebar({ show, onClose, persona, family, onSelectFamily }: Props) {
  const [editPerson, setEditPerson] = useState<Person | undefined>(persona);
  const [showPeople, setShowPeople] = useState(true);

  useEffect(() => {
    setEditPerson(persona);
  }, [persona]);

  return (
    <div id="sidebar" className={show ? 'open' : ''}>
      <div className="sidebar-content p-3">
        <div className="sidebar-title mb-3">
          <h3 className="ps-0">
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                setEditPerson(undefined);
                setShowPeople(true);
              }}
            >
              Personas
            </button>
            <Button
              type="button"
              className="sm float-end"
              variant="outline-secondary"
              onClick={(e) => {
                onClose();
                e.preventDefault();
              }}
            >
              &times;
            </Button>
          </h3>
        </div>
        {editPerson ? (
          <PersonaForm
            family={family}
            persona={editPerson}
            onClose={() => {
              setEditPerson(undefined);
              setShowPeople(true);
            }}
            tree={family?.members || []}
          />
        ) : (
          ''
        )}

        {showPeople ? (
          <PeopleList
            show={showPeople}
            onClose={() => {
              setShowPeople(false);
            }}
            onShowPersona={(p: Person) => {
              setEditPerson(p);
              setShowPeople(false);
            }}
            onSelectFamily={onSelectFamily}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Sidebar;
