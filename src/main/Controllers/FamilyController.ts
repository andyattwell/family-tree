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

export default {
  async all() {
    try {
      const families = (await Family.findAll()).map((f) => {
        return f.dataValues;
      });
      return families;
    } catch (error) {
      return error;
    }
  },
  async get(familyID: number) {
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
      familyData.members = parseMembers(family.members);

      return familyData;
    } catch (error) {
      console.log('family Error', error);
      return error;
    }
  },
  async save(data: any) {
    try {
      const family = await Family.create(data);
      return family.dataValues;
    } catch (error) {
      return error;
    }
  },
  async update(data: any) {
    try {
      if (data.backgroundSize) {
        data.backgroundSize = JSON.stringify(data.backgroundSize);
      }
    } catch (error) {
      console.log(error);
      data.backgroundSize = '{"width": 100, "height": 100}';
    }
    let family = null;
    try {
      family = await Family.findOne({
        where: {
          id: data.id,
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
            ],
          },
        ],
      });
      await family?.update(data);
    } catch (error) {
      console.log(error);
      return error;
    }

    if (!family) {
      return {};
    }
    const result = family.dataValues;

    try {
      if (result.backgroundSize) {
        result.backgroundSize = JSON.parse(result.backgroundSize);
      } else {
        result.backgroundSize = {
          width: 100,
          height: 100,
        };
      }
    } catch (error) {
      console.log(error);
      result.backgroundSize = {
        width: 100,
        height: 100,
      };
    }

    try {
      result.members = parseMembers(result.members);
    } catch (error) {
      console.log(error);
      result.members = [];
    }
    return result;
  },
  async detroy(id: number) {
    try {
      return await Family.destroy({ where: { id } });
    } catch (error) {
      console.warn('Error deleting family');
      console.log(error);
      return error;
    }
  },
};
