import { useState } from 'react';
import * as THREE from 'three';
import { Vector2 } from 'three';
import AppNav from './components/AppNav';
import Sidebar from './components/Sidebar';
import PersonaForm from './components/PersonaForm';
import Animation from './components/Animation';
import getMinPosition from './helpers';
import { Family, Person, MenuProps } from './types';
import PersonMenu from './components/PersonMenu';
import MockData from './mock-data';
import FamilyForm from './components/FamilyForm';

function App() {
  const [trees, setTrees] = useState<Family[]>(MockData);
  const [family, setFamily] = useState<Family | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [persona, setPersona] = useState<Person | null>(null);
  const [menu, setMenu] = useState<MenuProps | null>(null);
  const [showFamilyForm, setShowFamilyForm] = useState(false);

  const handeChange = (f: Family) => {
    setFamily(f);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
    setPersona(null);
  };

  const showPersona = (item: Person) => {
    setShowSidebar(true);
    setMenu(null);
    setPersona(item);
  };

  const updatePositions = (item: Person, pos: THREE.Vector3) => {
    family?.tree.map((person) => {
      if (person.id === item.id) {
        person.position = pos;
      }

      person.parents?.map((parent) => {
        if (parent.id === item.id) {
          parent.position = pos;
        }
        return parent;
      });
      const min = getMinPosition(person);
      if (person.position.z < min) {
        person.position.z = min;
      }
      return person;
    });
  };

  const onContexMenu = (e: any, item: Person): void => {
    if (e.object && (!menu || menu.item !== item)) {
      setMenu({
        item,
        // position: e.object.position,
        position: new Vector2(e.clientX, e.clientY),
      });
    } else {
      setMenu(null);
    }
  };

  return (
    <div id="app">
      <AppNav
        onChangeTree={handeChange}
        trees={trees}
        onAdd={() => {
          console.log('onAdd');
          setShowFamilyForm(true);
        }}
      />

      <div className="main-container">
        {showSidebar && persona ? (
          <Sidebar onClose={closeSidebar} show={showSidebar}>
            <PersonaForm
              persona={persona}
              onUpdate={closeSidebar}
              onClose={closeSidebar}
            />
          </Sidebar>
        ) : (
          ''
        )}
        {menu ? (
          <PersonMenu
            item={menu.item}
            position={menu.position}
            onShow={showPersona}
          />
        ) : (
          ''
        )}
        {family ? (
          <Animation
            tree={family.tree}
            updatePositions={updatePositions}
            onContexMenu={onContexMenu}
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

export default App;
