import { useEffect, useRef, useState } from 'react';
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import FamilyService from '../services/FamilyService';
import { Family } from '../types';

interface Props {
  family: Family;
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
    <Form>
      <FormGroup>
        <FormLabel>
          Nombre:
          <input
            type="text"
            name="name"
            className="ms-3"
            defaultValue={data.title}
            onChange={handleInputChange}
          />
        </FormLabel>
      </FormGroup>
      <FormGroup>
        <FormLabel>
          Color de fodo:
          <input
            type="text"
            name="backgroundColor"
            className="ms-3"
            defaultValue={data.backgroundColor}
            onChange={handleInputChange}
          />
        </FormLabel>
      </FormGroup>
      <Button onClick={handleSubmit} variant="primary">
        Guardar
      </Button>
      <Button onClick={handleClose} variant="secondary" className="float-end">
        Cancelar
      </Button>
    </Form>
  );
}
