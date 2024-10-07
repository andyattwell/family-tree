import { useRef } from 'react';
import {
  Modal,
  ModalDialog,
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
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

    // calling IPC exposed from preload script
    window.electron.ipcRenderer.once('ipc-people-family-response', (arg) => {
      console.log(arg);
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <ModalDialog>
      <Modal show={show}>
        <ModalHeader>
          <ModalTitle>Crear familia</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <FormLabel>
                Nomber:
                <input type="text" name="name" className="ms-3" ref={name} />
              </FormLabel>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} variant="primary">
            Guardar
          </Button>
          <Button onClick={handleClose} variant="secondary">
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </ModalDialog>
  );
}
