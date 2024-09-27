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

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function FamilyForm(props: Props) {
  const { show, onClose } = props;
  const name = useRef();
  const handleSubmit = () => {
    if (!name.current) {
      return;
    }
    window.electron.ipcRenderer.sendMessage('ipc-families-save', {
      title: name.current.value,
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
          <ModalTitle>Title</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <FormLabel>
                Family name:
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
