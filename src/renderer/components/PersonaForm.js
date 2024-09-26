import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

function PersonaForm(props) {
  const { persona } = props;
  console.log(persona);

  const handleInputChange = (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    persona[name] = value;
  };

  const handleUpload = (e) => {
    console.log('Handle Upload');
  };

  const handleHide = () => {
    props.onClose();
  };

  const reorderDate = (dateString) => {
    let string = '';
    if (dateString) {
      const d = new Date(dateString).toLocaleDateString().split('/');
      d[1] = d[1] <= 9 ? `0${d[1]}` : d[1];
      d[0] = d[0] <= 9 ? `0${d[0]}` : d[0];
      string = `${d[2]}-${d[1]}-${d[0]}`;
    }
    return string;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(persona);

    persona.birthdate = new Date(persona.birthdate);
    persona.dod = new Date(persona.dod);

    if (persona.id) {
    } else {
    }
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
            defaultValue={persona.name}
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
                defaultValue={persona.birthdate}
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
                defaultValue={persona.dod}
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
            <label key={g.value} className="radio-inline me-2" htmlFor="genero">
              <input
                id="genero"
                name="genero"
                type="radio"
                value={g.value}
                defaultChecked={persona.genero === g.value}
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
            defaultValue={persona.description}
          />
        </label>
      </div>

      <div className="form-group mb-3">
        <label className="control-label" htmlFor="file">
          Foto
          <input
            className="form-control"
            type="file"
            name="file"
            onChange={handleUpload}
            accept="image/*"
          />
          {`Archivo: ${persona.php ? persona.php : ''}`}
        </label>
      </div>

      <div className="form-group">
        <ButtonGroup>
          <Button onClick={handleSubmit} variant="primary">
            Guardar
          </Button>
          <Button onClick={handleHide} variant="secondary">
            Cancelar
          </Button>
        </ButtonGroup>
      </div>
    </form>
  );
}

export default PersonaForm;
