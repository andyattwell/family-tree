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

  // The `state` arg is correctly typed as `RootState` already

  const getFamilies = useCallback(() => {
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

  const getFamily = useCallback((familyID: number) => {
    FamilyService.getFamily(familyID)
      .then((response: any) => {
        response.tree = response.tree.map((p: Person) => {
          if (typeof p.parents === 'object') {
            p.parents = p.parents?.map((pid: any) => {
              const per = response.tree.find((f: Person) => {
                return Number(f.id) === Number(pid);
              });
              return per;
            });
          }
          return p;
        });
        setFamily(response);
        // props.setTree(response.tree);
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
    if (!fam.tree) {
      return false;
    }
    fam.tree.map((person) => {
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
    if (!menu || menu.item?.id !== item.id) {
      setMenu({
        item,
        position: new Vector2(e.clientX, e.clientY),
      });
    } else {
      setMenu(null);
    }
  };

  return (
    <div id="app">
      <AppNav
        onSelectFamily={selectFamily}
        trees={trees}
        family={family}
        onAddTree={() => {
          setShowFamilyForm(true);
        }}
        onAddPerson={showPersona}
      />

      <div className="main-container">
        <Sidebar onClose={closeSidebar} show={showSidebar}>
          <div className="sidebar-title">
            <h4>{persona?.id ? persona.name : 'Crear'}</h4>
          </div>
          {persona ? (
            <PersonaForm
              persona={persona}
              onClose={closeSidebar}
              tree={family?.tree || []}
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
          />
        ) : (
          ''
        )}
        {family?.tree ? (
          <Animation
            onContexMenu={onContexMenu}
            tree={family?.tree}
            updatePositions={updatePositions}
          />
        ) : (
          ''
        )}
      </div>

      <FamilyForm
        show={showFamilyForm}
        onClose={() => {
          setShowFamilyForm(false);
        }}
      />
    </div>
  );
}

// export default App;

export default connect(null, { setTree })(App);
// export default AddTodo;
