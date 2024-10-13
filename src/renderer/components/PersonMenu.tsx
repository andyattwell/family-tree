import { Vector2, Vector3 } from 'three';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Person } from '../types';
import FamilyService from '../services/FamilyService';

interface MenuProps {
  item: Person;
  position: Vector2;
  onShow: (item: Person) => void;
  onAddPerson: (item: any) => void;
  ondeletePerson: (item: any) => void;
}

export default function PersonMenu(props: MenuProps) {
  const { position, item, onShow, onAddPerson, ondeletePerson } = props;
  const width = 200;
  const height = 100;

  const handleEdit = () => {
    onShow(item);
  };

  const handleAddChildren = () => {
    onAddPerson({
      parents: [item],
      familyId: Number(item.familyId),
      family: item.family,
      position: new Vector3(
        item.position?.x,
        0.1,
        (item.position?.z || 0) + 12,
      ),
    });
  };

  const handleDelete = () => {
    FamilyService.deletePerson(item.id)
      .then((response: any) => {
        ondeletePerson(item);
        console.log('handleDelete then', response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="context-menu"
      style={{
        width,
        height,
        position: 'fixed',
        top: position.y,
        left: position.x,
        zIndex: 10,
      }}
    >
      <ListGroup>
        <ListGroupItem type="button" onClick={handleEdit}>
          Edit
        </ListGroupItem>
        <ListGroupItem type="button" onClick={handleAddChildren}>
          Agregar hijo
        </ListGroupItem>
        <ListGroupItem type="button" onClick={handleDelete}>
          Eliminar
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
