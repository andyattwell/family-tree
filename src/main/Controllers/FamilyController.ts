import Family from '../Models/Family';
import Person from '../Models/Person';

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
      familyData.members = family.members.map((person: Person) => {
        const data = { ...person.dataValues };

        data.parents = person.parents?.map((p: Person) => {
          const pd = { ...p.dataValues };
          pd.position = pd.position
            ? JSON.parse(pd.position)
            : { x: 0, y: 1, z: 0 };
          return pd;
        });

        data.position = data.position
          ? JSON.parse(data.position)
          : { x: 0, y: 1, z: 0 };
        return data;
      });

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
