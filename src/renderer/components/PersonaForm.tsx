import {
  Button,
  ButtonGroup,
  FormSelect,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Person } from '../types';
import FamilyService from '../services/FamilyService';
import PersonSelect from './PersonSelect';
import logo from '../images/person.png';

interface ParentsListProps {
  item: Person;
  tree: Person[];
  onAdd: (parent: Person) => void;
  onRemove: (parent: Person) => void;
}

function ParentsList(props: ParentsListProps) {
  const [showSelect, setShowSelect] = useState(false);
  const { item, tree, onAdd, onRemove } = props;
  const addParent = (e) => {
    const pid = Number(e.target.value);
    const per = tree.find((p) => p.id === pid);
    if (per) {
      onAdd(per);
    }
    setShowSelect(false);
  };

  const removeParent = (parent: Person) => {
    console.log('removeParent', parent);
    onRemove(parent);
  };

  return (
    <>
      <h6>Padres:</h6>
      <ListGroup className="parents-list mb-3">
        {item.parents?.map((person: Person) => {
          return (
            <ListGroupItem key={person.id}>
              <div className="photo-container">
                {person.photo ? (
                  <img src={person.photo} width="100%" alt={person.name} />
                ) : (
                  ''
                )}
              </div>
              <span>
                {person.id} - {person.name}
              </span>
              <Button
                variant="danger"
                className="btn-sm float-end remove-btn"
                onClick={() => {
                  removeParent(person);
                }}
              >
                X
              </Button>
            </ListGroupItem>
          );
        })}
        <ListGroupItem
          className="add-parent-btn"
          onClick={() => {
            setShowSelect(true);
          }}
        >
          <span>Agregar</span>
        </ListGroupItem>
      </ListGroup>

      {showSelect ? (
        <>
          <PersonSelect onSelect={addParent} tree={tree} person={item} />
          <Button
            variant="secondary"
            className="btn-sm"
            onClick={() => setShowSelect(false)}
          >
            Cerrar
          </Button>
        </>
      ) : (
        ''
      )}
    </>
  );
}

interface PersonaFormProps {
  persona: Person | null;
  onClose: (data: any | null) => void;
  tree: Person[];
}

function PersonaForm(props: PersonaFormProps) {
  const { persona, onClose, tree } = props;

  const [data, setData] = useState<any>({ parents: [] });
  const [photo, setPhoto] = useState<string>(persona?.photo || '');

  useEffect(() => {
    let p: any = {
      parents: [],
    };
    if (persona) {
      p = { ...persona };
      p.parents = persona.parents;
    }
    setPhoto(persona?.photo || '');
    setData(p);
  }, [persona]);

  const handleInputChange = (e: any) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const arr = data;
    arr[name] = value;
    setData(arr);
  };

  const handlePositionChange = (e: any) => {
    const { target } = e;
    const value = e.target.value;
    const { name } = target;
    const arr = data;
    arr.position[name] = value;
    setData(arr);
  };

  const handleAddParent = (parent: Person) => {
    const d = { ...data };
    d.parents = data.parents;
    d.parents.push(parent);
    setData(d);
  };

  const handleRemoveParent = (parent: Person) => {
    console.log('handleRemoveParent', parent);

    FamilyService.removeParent({
      personId: data.id,
      parentId: parent.id,
    })
      .then((response) => {
        const d = { ...data };
        d.parents = data.parents.filter((p: Person) => p.id !== parent.id);
        setData(d);
        onClose(d);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
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

  const handleSaveParents = (parent: Person) => {
    console.log('handleAddParent', {
      personId: data.id,
      parentId: parent.id,
    });
    FamilyService.addParent({
      personId: data.id,
      parentId: parent.id,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const d = { ...data };

    d.birthdate = data.birthdate ? new Date(data.birthdate) : null;
    d.dod = data.dod ? new Date(data.dod) : null;
    d.photo = photo;
    d.parents = null;
    // d.parents = data.parents?.map((p: Person) => {
    //   return { id: p.id };
    // });

    console.log('data', d);
    FamilyService.savePerson(d)
      .then((response: any) => {
        data.id = response.id;
        if (data.parents.length) {
          data.parents.forEach((parent: Person) => {
            handleSaveParents(parent);
          });
        }
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

  const dateToString = (date: Date) => {
    if (!date) {
      return '';
    }

    if (typeof date === 'string') {
      return date;
    }

    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);

    return `${date.getFullYear()}-${month}-${day}`;
  };
  return (
    <form onSubmit={handleSubmit} className="persona-form">
      <div className="form-group mb-3 text-center">
        <div className="photo-container mb-3">
          <img src={photo || logo} width="100%" alt={data.name} />
          <label
            className="btn btn-secondary btn-sm"
            htmlFor="photo-file"
            id="photo-file-btn"
          >
            {photo ? 'Cambiar foto' : 'Agregar foto'}
          </label>
          <input
            className="form-control"
            type="file"
            id="photo-file"
            name="photo"
            onChange={handleUpload}
            accept="image/*"
          />
        </div>
      </div>

      <div className="form-group mb-2">
        <label className="control-label" htmlFor="name">
          Nombre
        </label>
        <input
          className="form-control"
          type="text"
          id="name"
          name="name"
          defaultValue={data.name}
          onChange={handleInputChange}
        />
      </div>

      {/* Fechas */}
      <div className="row">
        <div className="form-group col-6">
          <label className="control-label" htmlFor="birthdate">
            Fecha de nacimiento
          </label>
          <input
            className="form-control"
            type="date"
            id="birthdate"
            name="birthdate"
            defaultValue={dateToString(data.birthdate)}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-6">
          <label className="control-label" htmlFor="dod">
            Fecha de fallecimiento
          </label>
          <input
            className="form-control"
            type="date"
            id="dod"
            name="dod"
            defaultValue={dateToString(data.dod)}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Genero */}
      {/* <div className="form-group mb-3">
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
      </div> */}

      <div className="form-group my-3">
        <ParentsList
          item={data}
          tree={tree}
          onAdd={handleAddParent}
          onRemove={handleRemoveParent}
        />
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

      {/* Position */}
      {/* <div className="form-group mb-3">
        <div className="row">
          <div className="col-4">
            <label className="control-label">X</label>
            <input
              className="form-control"
              type="number"
              name="z"
              defaultValue={data.position.x}
              onChange={handlePositionChange}
            />
          </div>
          <div className="col-4">
            <label className="control-label">Y</label>
            <input
              className="form-control"
              type="number"
              name="y"
              defaultValue={data.position.y}
              onChange={handlePositionChange}
            />
          </div>
          <div className="col-4">
            <label className="control-label">Z</label>
            <input
              className="form-control"
              type="number"
              name="z"
              defaultValue={data.position.z}
              onChange={handlePositionChange}
            />
          </div>
        </div>
      </div> */}

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
