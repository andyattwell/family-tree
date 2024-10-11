import { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Image } from 'react-bootstrap';
import { Family, Person } from '../types';
import PersonaForm from './PersonaForm';
import FamilyList from './FamilyList';
import FamilyTab from './Tabs/FamilyTab';
import menuIcon from '../images/menu-icon.png';
import menuOpenIcon from '../images/menu-open-icon.png';

interface Props {
  show: boolean;
  onToggle: (arg?: any) => void;
  onSelectFamily: (family: Family | undefined) => void;
  onSelectPerson: (person: Person | undefined) => void;
  families: Family[];
  persona: Person | undefined;
  family: Family | undefined;
}

function Sidebar({
  show,
  families,
  persona,
  family,
  onToggle,
  onSelectFamily,
  onSelectPerson,
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
    onSelectPerson(undefined);
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
        className="btn btn-sm float-end btn-outline-secondary sidebar-toggle-btn"
        onClick={onToggle}
      >
        <Image src={!show ? menuIcon : menuOpenIcon} width={20} />
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
                onSelectPerson(p);
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
