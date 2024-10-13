import { useEffect, useState } from 'react';
import ColorPicker from './ColorPicker';
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  Card,
  CardBody,
} from 'react-bootstrap';
import FamilyService from '../services/FamilyService';
import { Family } from '../types';

interface Props {
  family: Family | undefined;
  onClose: (family: Family) => void;
}

export default function FamilyForm(props: Props) {
  const { onClose, family } = props;
  const [data, setData] = useState<any>({});
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showItemPicker, setShowItemPicker] = useState(false);

  useEffect(() => {
    setData({ ...family });
  }, [family]);

  const handleInputChange = (e: any) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const arr = data;
    arr[name] = value;
    setData(arr);
  };

  const handleSubmit = () => {
    if (!data.title || data.title === '') {
      return;
    }
    FamilyService.saveFamily(data)
      .then((response: any) => {
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

  const updateColor = (attr: string, color: string) => {
    const arr = data;
    arr[attr] = color;
    setData(arr);
  };

  return (
    <Card>
      <CardBody>
        <Form>
          <FormGroup className="row mb-3">
            <div className="col-4">
              <FormLabel>Nombre:</FormLabel>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="title"
                className="form-control"
                defaultValue={data.title}
                onChange={handleInputChange}
              />
            </div>
          </FormGroup>
          <FormGroup className="row mb-3">
            <div className="col-4">
              <FormLabel>Color de fodo:</FormLabel>
            </div>
            <div className="col-8">
              <ColorPicker
                defaultColor={data.backgroundColor}
                onChange={(c: string) => {
                  updateColor('backgroundColor', c);
                  setShowBgPicker(false);
                }}
                onCancel={() => {
                  setShowBgPicker(false);
                }}
                show={showBgPicker}
                onShow={() => {
                  setShowBgPicker(true);
                }}
              />
            </div>
          </FormGroup>
          <FormGroup className="row mb-3">
            <div className="col-4">
              <FormLabel>Color de cosito:</FormLabel>
            </div>
            <div className="col-8">
              <ColorPicker
                defaultColor={data.itemColor}
                onChange={(c: string) => {
                  updateColor('itemColor', c);
                  setShowItemPicker(false);
                }}
                onCancel={() => {
                  setShowItemPicker(false);
                }}
                show={showItemPicker}
                onShow={() => {
                  setShowItemPicker(true);
                }}
              />
            </div>
          </FormGroup>
          <Button onClick={handleSubmit} variant="primary">
            Guardar
          </Button>
          <Button
            onClick={handleClose}
            variant="secondary"
            className="float-end"
          >
            Cancelar
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
