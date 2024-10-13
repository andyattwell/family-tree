import Family from '../Models/Family';
import Person from '../Models/Person';
import PersonParents from '../Models/PersonParents';

const parsePerson = (person: Person) => {
  const response = { ...person.dataValues };

  response.parents = response.parents?.map((p: Person) => {
    const pd = { ...p.dataValues };
    pd.position = pd.position ? JSON.parse(pd.position) : { x: 0, y: 1, z: 0 };
    return pd;
  });

  response.position = response.position
    ? JSON.parse(response.position)
    : { x: 0, y: 1, z: 0 };

  return response;
};

const all = async () => {
  try {
    return (
      await Person.findAll({
        include: [
          {
            model: Family,
            as: 'family',
          },
        ],
      })
    ).map((person: any) => {
      const data = { ...person.dataValues };
      if (person.family) {
        data.family = person.family.dataValues;
      }
      return data;
    });
  } catch (error) {
    return error;
  }
};

const get = async (id: number) => {
  const person = await Person.findOne({
    where: { id },
    include: [
      {
        model: Person,
        as: 'parents',
      },
    ],
  });

  if (!person) {
    return null;
  }

  return parsePerson(person);
};

const create = async (data: any) => {
  const newPerson = await Person.create(data);
  return get(newPerson.id);
};

const update = async (data: any) => {
  await Person.update(data, {
    where: {
      id: data.id,
    },
  });
  return get(data.id);
};

const save = async (data: any) => {
  try {
    let person: any;
    if (data.position) {
      data.position = JSON.stringify(data.position);
    }
    if (data.id) {
      person = update(data);
    } else {
      person = create(data);
    }
    return person;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const addParents = async (data: any) => {
  const parentsArr = data.parents.map();

  try {
    return await PersonParents.bulkCreate({
      personId,
      parentId,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addParent = async ({
  personId,
  parentId,
}: {
  personId: number;
  parentId: number;
}) => {
  try {
    return await PersonParents.create({
      personId,
      parentId,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const removeParent = async ({
  personId,
  parentId,
}: {
  personId: number;
  parentId: number;
}) => {
  try {
    return await PersonParents.destroy({
      where: {
        personId,
        parentId,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const destroy = async (id: number) => {
  try {
    return await Person.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.warn('Error deleting person');
    console.log(error);
    return error;
  }
};

export default {
  all,
  save,
  addParent,
  removeParent,
  destroy,
};
