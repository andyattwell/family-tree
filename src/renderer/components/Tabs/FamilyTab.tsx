import { Family, Person } from '../../types';
import FamilyForm from '../FamilyForm';
import PeopleList from '../PeopleList';

interface Props {
  family: Family | undefined;
  onSelectFamily: (family: Family | undefined) => void;
  onSelectPerson: (person: Person | undefined) => void;
}

function FamilyTab(props: Props) {
  const { family, onSelectFamily, onSelectPerson } = props;
  return (
    <>
      <FamilyForm
        family={family}
        onClose={(res: Family | undefined) => {
          onSelectFamily(res);
        }}
      />
      <h3>Miembros</h3>
      <PeopleList
        people={family?.members || []}
        family={family}
        onShowPersona={(p: Person) => {
          onSelectPerson(p);
        }}
        onSelectFamily={onSelectFamily}
      />
    </>
  );
}

export default FamilyTab;
