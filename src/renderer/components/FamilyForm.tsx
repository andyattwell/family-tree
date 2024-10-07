import { useRef } from 'react';
import { Modal, Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import FamilyService from '../services/FamilyService';

interface Props {
  show: boolean;
  onClose: (family: any) => void;
}

export default function FamilyForm(props: Props) {
  const { show, onClose } = props;
  const name = useRef();
  const handleSubmit = () => {
    if (!name.current) {
      return;
    }
    console.log('handleSubmit', name.current.value);
    FamilyService.addFamily(name.current.value)
      .then((response) => {
        onClose(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`modal text-white ${show ? 'show' : ''}`}
      style={{ display: show ? 'block' : 'none' }}
    >
      <Modal.Dialog data-bs-theme="dark">
        <Modal.Header closeButton>
          <Modal.Title>Crear familia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel>
                Nomber:
                <input type="text" name="name" className="ms-3" ref={name} />
              </FormLabel>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} variant="primary">
            Guardar
          </Button>
          <Button onClick={handleClose} variant="secondary">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
