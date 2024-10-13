import { useCallback, useState } from 'react';
import { Vector2, Vector3 } from 'three';
import { connect } from 'react-redux';
import { setTree } from './redux/actions';

import AppNav from './components/AppNav';
import Sidebar from './components/Sidebar';
import Animation from './components/Animation/Animation';
import { Family, Person, MenuProps } from './types';
import PersonMenu from './components/PersonMenu';
import FamilyForm from './components/FamilyForm';
import FamilyService from './services/FamilyService';

function App() {
  const [trees, setTrees] = useState<Family[]>([]);
  const [family, setFamily] = useState<Family | undefined>(undefined);
  const [showSidebar, setShowSidebar] = useState(false);
  const [persona, setPersona] = useState<Person | undefined>(undefined);
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

  const getFamily = useCallback(
    (familyId: number) => {
      FamilyService.getFamily(familyId)
        .then((response: any) => {
          setFamily(response);
          const t = trees.map((f: Family) => {
            if (f.id === response.id) {
              return response;
            }
            return f;
          });
          setTrees(t);
          return response;
        })
        .catch(() => {});
    },
    [trees],
  );

  const selectFamily = (f: Family | undefined) => {
    if (f?.id) {
      getFamily(f.id);
    } else {
      setFamily(f);
    }
  };

  const toggleSidebar = (data: any) => {
    if (family && data) {
      getFamily(family.id);
    }
    setShowSidebar(!showSidebar);
  };

  const showPersona = (item: Person | undefined) => {
    if (persona) {
      persona.selected = false;
    }
    setShowSidebar(true);
    setMenu(null);
    if (item) {
      item.selected = true;
    }
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

  const onContexMenu = (e: any, item?: Person): void => {
    e.nativeEvent.preventDefault();
    if (item && (!menu || menu.item?.id !== item.id)) {
      setMenu({
        item,
        position: new Vector2(e.clientX, e.clientY),
      });
    } else {
      setMenu(null);
      setPersona(undefined);
    }
  };

  const onDeletePerson = (item: Person) => {
    setMenu(null);
    if (item.familyId) {
      getFamily(item.familyId);
    }
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
          setShowSidebar(true);
        }}
      />

      <Sidebar
        onToggle={toggleSidebar}
        show={showSidebar}
        onSelectFamily={selectFamily}
        onSelectPerson={showPersona}
        persona={persona}
        family={family}
        families={trees}
      />

      <div className={`main-container ${showSidebar ? 'open' : ''}`}>
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
        <div id="tree-view">
          {family?.members ? (
            <Animation
              onContexMenu={onContexMenu}
              tree={family?.members}
              family={family}
              updatePositions={updatePositions}
              onUpdateFamily={setFamily}
              selected={persona}
              onSelect={(person: Person) => {
                setPersona(person);
              }}
            />
          ) : (
            ''
          )}
        </div>
      </div>

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
