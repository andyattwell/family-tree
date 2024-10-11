import { useEffect, useState } from 'react';
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
    // data.backgroundPosition = {
    //   x: 0,
    //   y: 1,
    //   z: 0,
    // };
    console.log({ data });
    FamilyService.updateFamily(data)
      .then((response: any) => {
        console.log({ response });

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
              <input
                type="text"
                name="backgroundColor"
                className="form-control"
                defaultValue={data.backgroundColor}
                onChange={handleInputChange}
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
