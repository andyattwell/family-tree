import { useCallback, useState } from 'react';
import { Vector2, Vector3 } from 'three';
import { connect } from 'react-redux';
import { setTree } from './redux/actions';

import AppNav from './components/AppNav';
import Sidebar from './components/Sidebar';
import PersonaForm from './components/PersonaForm';
import Animation from './components/Animation/Animation';
import { Family, Person, MenuProps } from './types';
import PersonMenu from './components/PersonMenu';
// import MockData from './mock-data';
import FamilyForm from './components/FamilyForm';
import FamilyService from './services/FamilyService';
import PeopleList from './components/PeopleList';

interface AppProps {
  setTree: (tree: any) => void;
}

function App(props: AppProps) {
  const [trees, setTrees] = useState<Family[]>([]);
  const [family, setFamily] = useState<Family | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [persona, setPersona] = useState<Person | null>(null);
  const [menu, setMenu] = useState<MenuProps | null>(null);
  const [showFamilyForm, setShowFamilyForm] = useState(false);
  const [load, setLoad] = useState(true);
  const [showPeople, setShowPeople] = useState(false);

  // The `state` arg is correctly typed as `RootState` already

  const getFamilies = useCallback(() => {
    console.log('getFamilies');
    FamilyService.getFamilies()
      .then((response: any) => {
        setTrees(response);
        return response;
      })
      .catch(() => {});
  }, [load]);

  if (load) {
    getFamilies();
    setLoad(false);
  }

  const getFamily = useCallback((familyId: number) => {
    console.log('getFamily');
    FamilyService.getFamily(familyId)
      .then((response: any) => {
        console.log({ response });
        setFamily(response);
        return response;
      })
      .catch(() => {});
  }, []);

  const selectFamily = (f: Family) => {
    getFamily(f.id);
  };

  const closeSidebar = (data: any) => {
    if (family && data) {
      getFamily(family.id);
    }
    setShowSidebar(false);
    setPersona(null);
  };

  const showPersona = (item: Person | null) => {
    setShowSidebar(true);
    setMenu(null);
    setPersona(item);
  };

  const addPerson = (data: Person) => {
    setShowSidebar(true);
    setMenu(null);
    setPersona(data);
  };

  const updatePositions = (item: Person, position: Vector3) => {
    const fam = { ...family } as Family;
    if (!fam.members) {
      return false;
    }
    fam.members.map((person) => {
      if (typeof person.parents === 'object') {
        person.parents = person.parents?.map((parent: any) => {
          if (parent.id === item.id) {
            parent.position = position;
          }
          return parent;
        });
      }
      return person;
    });
    setFamily(fam);
    return true;
  };

  const onContexMenu = (e: any, item: Person): void => {
    console.log('onContexMenu', item);
    e.nativeEvent.preventDefault();
    if (item && (!menu || menu.item?.id !== item.id)) {
      setMenu({
        item,
        position: new Vector2(e.clientX, e.clientY),
      });
    } else {
      setMenu(null);
    }
    return false;
  };

  const onDeletePerson = (item: Person) => {
    setMenu(null);
    getFamily(item.familyId);
  };

  return (
    <div id="app" data-bs-theme="dark">
      <AppNav
        onSelectFamily={selectFamily}
        onDeleteFamily={getFamilies}
        trees={trees}
        family={family}
        onAddTree={() => {
          setShowFamilyForm(true);
        }}
        onAddPerson={showPersona}
        onShowPeople={() => {
          setShowPeople(true);
        }}
      />

      <div className="main-container">
        <Sidebar onClose={closeSidebar} show={showSidebar}>
          <div className="sidebar-title">
            <h4>{persona?.id ? persona.name : `Agregar a ${family?.title}`}</h4>
          </div>
          {persona ? (
            <PersonaForm
              family={family}
              persona={persona}
              onClose={closeSidebar}
              tree={family?.members || []}
            />
          ) : (
            ''
          )}
        </Sidebar>
        {menu ? (
          <PersonMenu
            item={menu.item}
            position={menu.position}
            onShow={showPersona}
            onAddPerson={addPerson}
            ondeletePerson={onDeletePerson}
          />
        ) : (
          ''
        )}
        {family?.members ? (
          <Animation
            onContexMenu={onContexMenu}
            tree={family?.members}
            updatePositions={updatePositions}
          />
        ) : (
          ''
        )}
      </div>

      {showPeople ? (
        <PeopleList
          show={showPeople}
          onClose={() => {
            setShowPeople(false);
          }}
          onShowPersona={showPersona}
          onSelectFamily={selectFamily}
        />
      ) : (
        ''
      )}
      <FamilyForm
        show={showFamilyForm}
        onClose={(f: any) => {
          setShowFamilyForm(false);
          if (f) {
            selectFamily(f);
            getFamilies();
          }
        }}
      />
    </div>
  );
}

// export default App;

export default connect(null, { setTree })(App);
// export default AddTodo;
