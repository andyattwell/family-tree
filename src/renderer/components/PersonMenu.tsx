import { Vector2 } from 'three';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Person } from '../types';

interface MenuProps {
  item: Person;
  position: Vector2;
  onShow: (item: Person) => void;
}

export default function PersonMenu(props: MenuProps) {
  const { position, item, onShow } = props;
  const width = 200;
  const height = 100;

  const handleEdit = () => {
    onShow(item);
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
        <ListGroupItem className="bg-dark text-white" onClick={handleEdit}>
          Edit
        </ListGroupItem>
        <ListGroupItem className="bg-dark text-white">Add Parent</ListGroupItem>
        <ListGroupItem className="bg-dark text-white">
          Add Children
        </ListGroupItem>
        <ListGroupItem className="bg-dark text-white">Delete</ListGroupItem>
      </ListGroup>
    </div>
  );
}
