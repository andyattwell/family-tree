import { FormSelect } from 'react-bootstrap';
import { Person } from '../types';

interface Props {
  person: Person;
  tree: Person[];
  onSelect: (person: Person) => void;
  onClose: () => void;
}
export default function PersonSelect(props: Props) {
  const { person, tree, onSelect, onClose } = props;

  const treeFiltered = () => {
    return tree.filter((p: Person) => {
      const hasParent = person.parents?.find((pa: Person) => pa.id === p.id);
      return p.id !== person.id && !hasParent;
    });
  };
  return (
    <FormSelect onChange={onSelect}>
      <option value=""></option>
      {treeFiltered().map((person: Person) => {
        return (
          <option value={person.id} key={person.id}>
            {person.id} - {person.name}
          </option>
        );
      })}
    </FormSelect>
  );
}
