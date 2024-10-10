import { Button } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Family, Person } from '../types';
import PersonaForm from './PersonaForm';
import { useEffect, useState } from 'react';
import PeopleList from './PeopleList';
import FamilyForm from './FamilyForm';

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
  const [activeTab, setActiveTab] = useState('miembros');

  useEffect(() => {
    setEditPerson(persona);
  }, [persona]);

  useEffect(() => {
    if (editPerson) {
      console.log('editPerson');
      setActiveTab('editPerson');
    }
  }, [editPerson]);

  const changeTab = (k: string) => {
    console.log({ k });
    setActiveTab(k);
  };

  return (
    <div id="sidebar" className={show ? 'open' : ''}>
      <div className="sidebar-content p-3">
        <button
          type="button"
          className="btn btn-sm float-end btn-outline-secondary"
          onClick={(e) => {
            onClose();
          }}
        >
          &times;
        </button>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
          activeKey={activeTab}
          onSelect={changeTab}
        >
          <Tab eventKey="miembros" title="Miembros">
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
          </Tab>
          {family ? (
            <Tab eventKey="editPerson" title={family.title || 'Crear Familia'}>
              <FamilyForm
                family={family}
                onClose={(res: Family | null) => {
                  setEditPerson(undefined);
                  setShowPeople(true);
                  if (res) {
                    onSelectFamily(res);
                  }
                }}
              />
            </Tab>
          ) : (
            ''
          )}
          {editPerson ? (
            <Tab eventKey="editPerson" title={editPerson.name || 'Crear'}>
              <PersonaForm
                family={family}
                persona={editPerson}
                onClose={() => {
                  setEditPerson(undefined);
                  setShowPeople(true);
                }}
                tree={family?.members || []}
              />
            </Tab>
          ) : (
            ''
          )}
          <Tab eventKey="contact" title="Contact" disabled>
            Tab content for Contact
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Sidebar;
