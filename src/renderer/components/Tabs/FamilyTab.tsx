import { Vector3 } from 'three';
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
  const addFamilyMember = () => {
    const posX = family?.backgroundPosition?.x || 0;
    const posZ = family?.backgroundPosition?.z || 0;

    onSelectPerson({
      family,
      familyId: family?.id,
      position: new Vector3(posX, 1.3, posZ),
    } as Person);
  };
  return (
    <>
      <FamilyForm
        family={family}
        onClose={(res: Family | undefined) => {
          onSelectFamily(res);
        }}
      />
      <h3>
        Miembros
        <button
          type="button"
          className="btn btn-sm btn-success float-end"
          onClick={addFamilyMember}
        >
          Agregar miembro
        </button>
      </h3>
      <PeopleList
        people={family?.members || []}
        onShowPersona={(p: Person) => {
          onSelectPerson(p);
        }}
        onSelectFamily={onSelectFamily}
        showDelete
      />
    </>
  );
}

export default FamilyTab;
