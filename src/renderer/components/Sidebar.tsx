import { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Family, Person } from '../types';
import PersonaForm from './PersonaForm';
import PeopleList from './PeopleList';
import FamilyForm from './FamilyForm';
import FamilyList from './FamilyList';
import FamilyTab from './Tabs/FamilyTab';

interface Props {
  show: boolean;
  onClose: (arg?: any) => void;
  onSelectFamily: (family: Family | undefined) => void;
  families: Family[];
  persona: Person | undefined;
  family: Family | undefined;
}

function Sidebar({
  show,
  families,
  persona,
  family,
  onClose,
  onSelectFamily,
}: Props) {
  const [editPerson, setEditPerson] = useState<Person | undefined>(persona);
  const [showPeople, setShowPeople] = useState(true);
  const [activeTab, setActiveTab] = useState('familias');

  useEffect(() => {
    setEditPerson(persona);
  }, [persona]);

  useEffect(() => {
    if (editPerson) {
      setActiveTab('persona');
    } else if (family) {
      setActiveTab('family');
    } else {
      setActiveTab('familias');
    }
  }, [editPerson, family]);

  const changeTab = (eventKey: string | null, e?: any) => {
    if (eventKey) {
      setActiveTab(eventKey);
    }
  };

  const closePersonaForm = () => {
    setEditPerson(undefined);
    setShowPeople(true);
    onSelectFamily(family);
  };

  const changeFamily = (fa: Family | undefined) => {
    setEditPerson(undefined);
    onSelectFamily(fa);
  };

  const closeTab = (tab: string) => {
    if (tab === 'persona') {
      closePersonaForm();
    } else if (tab === 'family') {
      onSelectFamily(undefined);
    }
  };

  const tabTitle = (title: string, tab: string) => {
    return (
      <>
        {title}{' '}
        <div
          role="button"
          onKeyDown={() => {
            closeTab(tab);
          }}
          tabIndex={0}
          className="close-tab"
          onClick={() => {
            closeTab(tab);
          }}
        >
          x
        </div>
      </>
    );
  };

  return (
    <div id="sidebar" className={show ? 'open' : ''}>
      <button
        type="button"
        className="btn btn-sm float-end btn-outline-secondary sidebar-close-btn"
        onClick={onClose}
      >
        &times;
      </button>
      <Tabs
        defaultActiveKey="familias"
        className="mb-3"
        activeKey={activeTab}
        onSelect={changeTab}
      >
        <Tab eventKey="familias" title={'Familias'}>
          <FamilyList
            family={family}
            families={families}
            onSelectFamily={onSelectFamily}
            onDelete={() => {
              console.log('Reload families');
            }}
          />
        </Tab>

        {family ? (
          <Tab eventKey="family" title={tabTitle(family?.title, 'family')}>
            <FamilyTab
              family={family}
              onSelectFamily={changeFamily}
              onSelectPerson={(p: Person | undefined) => {
                setEditPerson(p);
                setShowPeople(false);
              }}
            />
          </Tab>
        ) : (
          ''
        )}

        {editPerson ? (
          <Tab
            eventKey="persona"
            title={tabTitle(editPerson.name || 'Agregar miembro', 'persona')}
          >
            <PersonaForm
              family={family}
              persona={editPerson}
              onClose={closePersonaForm}
              tree={family?.members || []}
            />
          </Tab>
        ) : (
          ''
        )}
      </Tabs>
    </div>
  );
}

export default Sidebar;
