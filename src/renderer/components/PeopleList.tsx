import { Button, Image, Table } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import FamilyService from '../services/FamilyService';
import { Family, Person } from '../types';
import defaultPhoto from '../images/person2.png';
import trashIcon from '../images/trash.png';
import { Vector3 } from 'three';

interface Props {
  people: Person[];
  family: Family | undefined;
  onShowPersona: (person: Person) => void;
  onSelectFamily: (family: Family) => void;
}

export default function PeopleList(props: Props) {
  const { family, people, onShowPersona, onSelectFamily } = props;

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

  const addFamilyMember = () => {
    const posX = family?.backgroundPosition?.x || 0;
    const posZ = family?.backgroundPosition?.z || 0;

    onShowPersona({
      family,
      familyId: family.id,
      position: new Vector3(posX, 1.3, posZ),
    });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Nombre</th>
            <th>Familia</th>
            <th>{''}</th>
          </tr>
        </thead>
        <tbody>
          {people.map((p: Person) => {
            return (
              <tr key={p.id + p.name}>
                <th>{p.id}</th>
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
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={addFamilyMember}
        >
          Agregar miembro
        </button>
      </div>
    </>
  );
}
