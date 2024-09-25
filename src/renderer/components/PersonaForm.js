
import React from 'react';
import { Button } from 'react-bootstrap';

function PersonaForm(props) {
  var persona = props.persona;
  console.log(persona);

  var handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    persona[name] = value;
  }

  var handleUpload = (e) => {
    console.log("Handle Upload");
  }

  var handleHide = () => {
    props.onClose()
  }

  var reorderDate = (dateString) => {
    var string = '';
    if (dateString) {
      var d = new Date(dateString).toLocaleDateString().split("/");
      d[1] = d[1] <= 9 ? "0" + d[1] : d[1];
      d[0] = d[0] <= 9 ? "0" + d[0] : d[0];
      string = d[2] + "-" + d[1] + "-" + d[0];
    }
    return string;
  }

  var handleSubmit = (e) => {
    e.preventDefault();

    console.log(persona);

    persona.birthdate = new Date(persona.birthdate);
    persona.dod = new Date(persona.dod);

    if (persona.id) {
    } else { }
    return false;
  }

  const generos = [
    { name: 'N/A', value: 'n/a' },
    { name: 'Hombre', value: 'hombre' },
    { name: 'Mujer', value: 'mujer' }
  ];

  return <form onSubmit={handleSubmit} className="persona-form">

    <div className="form-group">
      <label className="control-label">Nombre</label>
      <input className="form-control" type="text" name="name" defaultValue={persona.name} onChange={handleInputChange} />
    </div>

    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label className="control-label">Fecha de nacimiento</label>
          <input className="form-control" type="date" name="birthdate" defaultValue={persona.birthdate} onChange={handleInputChange} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label className="control-label">Fecha de fallecimiento</label>
          <input className="form-control" type="date" name="dod" defaultValue={persona.dod} onChange={handleInputChange} />
        </div>
      </div>
    </div>

    <div className="form-group">
      <label className="control-label">Género</label><br />
      {generos.map((g) => {
        return <label key={g.value} className="radio-inline"> <input name="genero" type="radio" value={g.value} defaultChecked={persona.genero === g.value} onChange={handleInputChange} /> {g.name} </label>
      })}
    </div>

    <div className="form-group">
      <label className="control-label">Descripción</label>
      <textarea className="form-control" name="description" onChange={handleInputChange} defaultValue={persona.description}></textarea>
    </div>

    <div className="form-group">
      <label className="control-label">Foto</label>
      <input className="form-control" type="text" name="file" onChange={handleUpload} accept="image/*" />
      {'Archivo: ' + (persona.php ? persona.php : '')}
    </div>

    <Button onClick={handleSubmit} bsStyle="primary">Guardar</Button>
    <Button onClick={handleHide}>Cancelar</Button>
  </form>

}



export default PersonaForm;
