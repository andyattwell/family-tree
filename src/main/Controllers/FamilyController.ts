import Family from '../Models/Family';
import Person from '../Models/Person';

function parsePosition(posStr: string | undefined) {
  const defaultVal = { x: 0, y: 1, z: 0 };
  if (!posStr) {
    return defaultVal;
  }
  let obj = null;
  try {
    obj = JSON.parse(posStr);
  } catch (error) {
    console.log('Error parsing position', { posStr, error });
  }

  return obj || defaultVal;
}
function parseMembers(members: Person[]) {
  return members.map((person: Person) => {
    const data = person.toJSON();
    data.position = parsePosition(data.position);

    data.parents = person.parents?.map((p: Person) => {
      const pd = p.toJSON();
      pd.position = parsePosition(pd.position);
      return pd;
    });
    return data;
  });
}

const all = async () => {
  try {
    const families = await Family.findAll();
    if (families.length) {
      return families.map((f) => {
        return f.dataValues;
      });
    }
    return [];
  } catch (error) {
    return error;
  }
};

const get = async (familyID: number) => {
  if (!familyID) {
    return null;
  }
  try {
    const family = await Family.findOne({
      where: {
        id: familyID,
      },
      include: [
        {
          model: Person,
          as: 'members',
          include: [
            {
              model: Person,
              as: 'parents',
            },
            {
              model: Family,
              as: 'family',
            },
          ],
        },
      ],
    });

    if (!family) {
      return {};
    }
    const familyData = { ...family.dataValues };
    if (familyData.backgroundSize) {
      familyData.backgroundSize = JSON.parse(familyData.backgroundSize);
    } else {
      familyData.backgroundSize = {
        width: 100,
        height: 100,
      };
    }
    if (familyData.backgroundPosition) {
      familyData.backgroundPosition = JSON.parse(familyData.backgroundPosition);
    } else {
      familyData.backgroundPosition = {
        x: 0,
        y: 1,
        z: 0,
      };
    }
    familyData.members = parseMembers(family.members);

    return familyData;
  } catch (error) {
    console.log('family Error', error);
    return error;
  }
};

const update = async (data: any) => {
  const family = await Family.findOne({
    where: {
      id: data.id,
    },
  });
  await family?.update(data);
  return get(data.id);
};

const create = async (data: any) => {
  try {
    const family = await Family.create(data);
    return get(family.id);
  } catch (error) {
    return error;
  }
};

const save = async (data: any) => {
  try {
    if (data.backgroundSize) {
      data.backgroundSize = JSON.stringify(data.backgroundSize);
    }
  } catch (error) {
    data.backgroundSize = '{"width": 100, "height": 100}';
  }

  try {
    if (data.backgroundPosition) {
      data.backgroundPosition = JSON.stringify(data.backgroundPosition);
    }
  } catch (error) {
    console.log(error);
    data.backgroundPosition = '{"x": 0, "y": 0.1, "z": 0}';
  }
  let family = null;
  if (data.id) {
    console.log('update', data);
    family = update(data);
  } else {
    console.log('create', data);
    family = create(data);
  }

  if (!family) {
    return {};
  }

  return family;
};

const destroy = async (id: number) => {
  try {
    return await Family.destroy({ where: { id } });
  } catch (error) {
    console.warn('Error deleting family');
    console.log(error);
    return error;
  }
};

export default {
  all,
  get,
  update,
  save,
  create,
  destroy,
};
