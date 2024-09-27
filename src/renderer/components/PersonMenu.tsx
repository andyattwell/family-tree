import { Vector2, Vector3 } from 'three';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Person } from '../types';

interface MenuProps {
  item: Person;
  position: Vector2;
  onShow: (item: Person) => void;
  onAddPerson: (item: Person) => void;
}

export default function PersonMenu(props: MenuProps) {
  const { position, item, onShow, onAddPerson } = props;
  const width = 200;
  const height = 100;

  const handleEdit = () => {
    onShow(item);
  };

  const handleAddChildren = () => {
    onAddPerson({
      parents: String(item.id),
      familyID: Number(item.familyID),
      position: new Vector3(item.position?.x, 1, (item.position?.z || 0) + 2),
    });
  };

  return (
    <div
      style={{
        width,
        height,
        position: 'fixed',
        top: position.y,
        left: position.x,
        zIndex: 10,
      }}
    >
      <ListGroup className="bg-dark">
        <ListGroupItem className="bg-dark text-white" onClick={onAddPerson}>
          Edit
        </ListGroupItem>
        <ListGroupItem className="bg-dark text-white">Add Parent</ListGroupItem>
        <ListGroupItem
          className="bg-dark text-white"
          onClick={handleAddChildren}
        >
          Add Children
        </ListGroupItem>
        <ListGroupItem className="bg-dark text-white">Delete</ListGroupItem>
      </ListGroup>
    </div>
  );
}
