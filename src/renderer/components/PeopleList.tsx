import { Modal, Button, Table, ButtonGroup } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import FamilyService from '../services/FamilyService';
import { Family, Person } from '../types';

interface Props {
  show: boolean;
  onClose: (family: any) => void;
  onShowPersona: (person: Person) => void;
  onSelectFamily: (family: Family) => void;
}

export default function PeopleList(props: Props) {
  const { show, onClose, onShowPersona, onSelectFamily } = props;
  const [people, setPeople] = useState<Person[]>([]);

  const handleClose = () => {
    onClose();
  };

  const getPeople = useCallback(() => {
    console.log('getPeople');
    FamilyService.getPeople()
      .then((response: any) => {
        setPeople(response);
        console.log({ response });
        return response;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getPeople();
  }, [show]);

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
    <div
      className={`modal text-white ${show ? 'show' : ''}`}
      style={{ display: show ? 'block' : 'none' }}
    >
      <Modal.Dialog data-bs-theme="dark">
        <Modal.Header closeButton>
          <Modal.Title>Personas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
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
                      <Button
                        variant="outline"
                        onClick={() => {
                          onShowPersona(p);
                        }}
                      >
                        {p.name}
                      </Button>
                    </th>
                    <th>
                      <Button
                        variant="outline"
                        onClick={() => {
                          onSelectFamily(p.family);
                        }}
                      >
                        {p.family?.title}
                      </Button>
                    </th>
                    <th>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          deletePerson(p.id);
                        }}
                      >
                        X
                      </Button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button variant="secondary" onClick={handleClose}>
              {'Cerrar'}
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
