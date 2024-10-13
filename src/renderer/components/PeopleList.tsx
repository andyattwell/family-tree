import { Image, Table } from 'react-bootstrap';
import FamilyService from '../services/FamilyService';
import { Family, Person } from '../types';
import defaultPhoto from '../images/person2.png';
import trashIcon from '../images/trash.png';

interface Props {
  people: Person[];
  onShowPersona: (person: Person) => void;
  onSelectFamily?: (family: Family) => void;
  showDelete?: boolean;
}

function PeopleList(props: Props) {
  const { people, onShowPersona, onSelectFamily, showDelete = false } = props;

  const deletePerson = (id: number) => {
    FamilyService.deletePerson(id)
      .then((response: any) => {
        getPeople();
        return response;
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Table striped bordered hover>
      {/* <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th>Nombre</th>
          <th>Familia</th>
          <th>{''}</th>
        </tr>
      </thead> */}
      <tbody>
        {people.map((p: Person) => {
          return (
            <tr key={p.id + p.name}>
              {/* <th>{p.id}</th> */}
              <th>
                <Image src={p.photo || defaultPhoto} width={30} />
              </th>
              <th>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    onShowPersona(p);
                  }}
                >
                  {p.name}
                </button>
              </th>
              {onSelectFamily ? (
                <th>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      onSelectFamily(p.family);
                    }}
                  >
                    {p.family?.title}
                  </button>
                </th>
              ) : (
                ''
              )}
              {showDelete ? (
                <th>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-outline-danger"
                    title="Eliminar persona"
                    onClick={() => {
                      deletePerson(p.id);
                    }}
                  >
                    <Image src={trashIcon} width={20} />
                  </button>
                </th>
              ) : (
                ''
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default PeopleList;
