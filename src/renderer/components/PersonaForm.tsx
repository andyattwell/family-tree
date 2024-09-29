import { Button, ButtonGroup } from 'react-bootstrap';
import { SyntheticEvent, useState } from 'react';
import { Person } from '../types';
import FamilyService from '../services/FamilyService';

interface FormProps {
  persona: Person | null;
  onClose: (data: any | null) => void;
}

function PersonaForm(props: FormProps) {
  const { persona, onClose } = props;

  const [data, setData] = useState<any>(
    persona
      ? { ...persona, parents: persona.parents?.map((p) => p.id).join(',') }
      : {},
  );

  const [photo, setPhoto] = useState<string>(persona?.photo || '');

  const handleInputChange = (e: any) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const arr = data;
    arr[name] = value;
    setData(arr);
  };

  const blobToDataUrl = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  const blobToBase64 = (blob: Blob) => blobToDataUrl(blob);
  // .then((text: any) => text.slice(text.indexOf(',')));

  const handleUpload = async (e: SyntheticEvent) => {
    const file = e.target.files[0];
    const base64 = await blobToBase64(file);
    setPhoto(base64);
  };

  const handleHide = () => {
    onClose(null);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    data.birthdate = data.birthdate ? new Date(data.birthdate) : null;
    data.dod = data.dod ? new Date(data.dod) : null;
    data.photo = photo;
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
      <div className="row">
        <div className="col-7">
          <div className="form-group mb-2">
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
          <div className="form-group mb-3">
            <p className="mb-0">Género</p>
            {generos.map((g) => {
              return (
                <label
                  key={g.value}
                  className="radio-inline me-2"
                  htmlFor="gender"
                >
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
        </div>
        <div className="col-5">
          <div className="form-group mb-3">
            <div>
              {photo ? <img src={photo} width="100%" alt={data.name} /> : ''}
            </div>
            <label className="control-label" htmlFor="photo">
              {/* Foto */}
              <input
                className="form-control"
                type="file"
                id="photo"
                name="photo"
                onChange={handleUpload}
                accept="image/*"
              />
            </label>
          </div>
        </div>
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

      <div className="form-group mb-3">
        <label className="control-label" htmlFor="description">
          Descripción
        </label>
        <textarea
          className="form-control w-100"
          id="description"
          name="description"
          onChange={handleInputChange}
          defaultValue={data.description}
        />
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
