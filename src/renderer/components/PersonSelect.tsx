import { Button, FormSelect } from 'react-bootstrap';
import { Family, Person } from '../types';
import { EventHandler, useEffect, useRef, useState } from 'react';
import PeopleList from './PeopleList';

interface Props {
  person: Person;
  tree: Person[];
  onSelect: (person: Person) => void;
  onClose: () => void;
}
export default function PersonSelect(props: Props) {
  const { person, tree, onSelect, onClose } = props;
  const [searchText, setSearchText] = useState('');
  const [filteredTree, setFilteredTree] = useState<Person[]>(tree || []);

  const applyFilter = () => {
    return tree.filter((p: Person) => {
      const hasParent = person.parents?.find((pa: Person) => pa.id === p.id);
      let isName = true;
      if (searchText !== '') {
        isName = p.name?.toLowerCase().includes(searchText.toLowerCase());
      }
      return isName && p.id !== person.id && !hasParent;
    });
  };

  useEffect(() => {
    const fTree = applyFilter();
    setFilteredTree(fTree);
  }, [tree]);

  useEffect(() => {
    const saveData = setTimeout(() => {
      console.log('ACA', searchText);
      const fTree = applyFilter();
      setFilteredTree(fTree);
    }, 500);

    return () => clearTimeout(saveData);
  }, [searchText]);

  const filterParents = (e: any) => {
    setSearchText(e.target.value);
    // console.log({ value: e.target.value });
  };

  return (
    <div className="p-3 bg-dark">
      <div className="row">
        <div className=" col-10">
          <input
            type="text"
            name="search"
            onChange={filterParents}
            className="form-control"
          />
        </div>
        <div className="col-2">
          <Button variant="secondary" className="btn-sm" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
      <div className="table-container">
        <div className="table-scroll">
          <PeopleList people={filteredTree} onShowPersona={onSelect} />
        </div>
        {/* <FormSelect onChange={onSelect}>
          <option value=""></option>
          {filteredTree.map((person: Person) => {
            return (
              <option value={person.id} key={person.id}>
                {person.id} - {person.name}
              </option>
            );
          })}
        </FormSelect> */}
      </div>
    </div>
  );
}
