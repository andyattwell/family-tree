import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import { Person } from '../types';
import FamilyService from '../services/FamilyService';

interface FormProps {
  persona: Person | null;
  onClose: (data: any | null) => void;
}

function PersonaForm(props: FormProps) {
  const { persona, onClose } = props;
  const [data, setData] = useState<any>(persona ? { ...persona } : {});

  console.log({ persona });

  const handleInputChange = (e: any) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const arr = data;
    arr[name] = value;
    setData(arr);
  };

  const handleUpload = (e: any) => {
    console.log('Handle Upload', e);
  };

  const handleHide = () => {
    onClose(null);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    data.birthdate = new Date(data.birthdate);
    data.dod = new Date(data.dod);
    console.log({ data });

    FamilyService.savePerson(data)
      .then((response) => {
        onClose(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  };

  const generos = [
    { name: 'N/A', value: 'n/a' },
    { name: 'Hombre', value: 'hombre' },
    { name: 'Mujer', value: 'mujer' },
  ];

  return (
    <form onSubmit={handleSubmit} className="persona-form">
      <div className="form-group mb-3">
        <label className="control-label" htmlFor="name">
          Nombre
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            defaultValue={data.name}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="form-group mb-3">
        <label className="control-label" htmlFor="parents">
          Padres
          <input
            className="form-control"
            type="text"
            id="parents"
            name="parents"
            defaultValue={data.parents}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <label className="control-label" htmlFor="birthdate">
              Fecha de nacimiento
              <input
                className="form-control"
                type="date"
                id="birthdate"
                name="birthdate"
                defaultValue={data.birthdate}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="control-label" htmlFor="dod">
              Fecha de fallecimiento
              <input
                className="form-control"
                type="date"
                id="dod"
                name="dod"
                defaultValue={data.dod}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="form-group mb-3">
        <p className="mb-0">Género</p>
        {generos.map((g) => {
          return (
            <label key={g.value} className="radio-inline me-2" htmlFor="gender">
              <input
                id="gender"
                name="gender"
                type="radio"
                value={g.value}
                defaultChecked={data.gender === g.value}
                onChange={handleInputChange}
                className="me-2"
              />
              {g.name}
            </label>
          );
        })}
      </div>

      <div className="form-group mb-3">
        <label className="control-label" htmlFor="description">
          Descripción
          <textarea
            className="form-control"
            id="description"
            name="description"
            onChange={handleInputChange}
            defaultValue={data.description}
          />
        </label>
      </div>

      <div className="form-group mb-3">
        <label className="control-label" htmlFor="photo">
          Foto
          <input
            className="form-control"
            type="file"
            id="photo"
            name="photo"
            onChange={handleUpload}
            accept="image/*"
          />
          {`Archivo: ${data.photo ? data.photo : ''}`}
        </label>
      </div>

      <div className="form-group">
        <Button onClick={handleSubmit} variant="primary">
          Guardar
        </Button>
        <ButtonGroup>
          <Button onClick={handleHide} variant="secondary">
            Cancelar
          </Button>
        </ButtonGroup>
      </div>
    </form>
  );
}

export default PersonaForm;
