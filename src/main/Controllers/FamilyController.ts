import Family from '../Models/Family';
import Person from '../Models/Person';

function parsePosition(posStr) {
  return posStr ? JSON.parse(posStr) : { x: 0, y: 1, z: 0 };
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
      const family = await Family.findOne({
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
      if (!family) {
        return {};
      }

      await family.update(data);
      const result = family.dataValues;
      if (result.backgroundSize) {
        result.backgroundSize = JSON.parse(result.backgroundSize);
      } else {
        result.backgroundSize = {
          width: 100,
          height: 100,
        };
      }
      result.members = parseMembers(result.members);
      return result;
    } catch (error) {
      return error;
    }
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
