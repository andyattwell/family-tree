import { Table, Image } from 'react-bootstrap';
import FamilyService from '../services/FamilyService';
import { Family } from '../types';
import FamilyForm from './FamilyForm';
import { useState } from 'react';
import RemoveFamilyIcon from '../images/group-remove.svg';

interface Props {
  families: Family[];
  family: Family | undefined;
  onDelete: () => void;
  onSelectFamily: (family: Family) => void;
}

function FamilyList(props: Props) {
  const { families, onDelete, onSelectFamily, family } = props;
  const [showForm, setShowForm] = useState(false);

  const deleteFamily = (id: number) => {
    FamilyService.deletePerson(id)
      .then((response: any) => {
        onDelete();
        return response;
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Familia</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {families.map((f: Family) => {
            return (
              <tr key={f.title}>
                <th>{f.id}</th>
                <th>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      onSelectFamily(f);
                      setShowForm(false);
                    }}
                  >
                    {f.title}
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => {
                      onSelectFamily(f);
                      setShowForm(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar familia"
                    onClick={() => {
                      deleteFamily(family.id);
                    }}
                  >
                    <Image src={RemoveFamilyIcon} />
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <button
        type="button"
        className="btn btn-success"
        onClick={() => {
          setShowForm(true);
        }}
      >
        Agregar
      </button>
    </>
  );
}

export default FamilyList;
