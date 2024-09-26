import {
  Modal,
  ModalDialog,
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  Button,
} from 'react-bootstrap';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function FamilyForm(props: Props) {
  const { show, onClose } = props;
  const handleSubmit = () => {
    console.log('submit');
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
          <p>Test 123</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} variant="primary">Guardar</Button>
          <Button onClick={handleClose} variant="secondary">Cancelar</Button>
        </ModalFooter>
      </Modal>
    </ModalDialog>
  );
}
