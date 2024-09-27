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
      const family = (
        await Family.findOne({
          where: {
            id: familyID,
          },
        })
      )?.dataValues;

      const tree = (
        await Person.findAll({
          where: {
            familyID: family.id,
          },
        })
      ).map((person: Person) => {
        const data = person.dataValues;
        data.position = data.position
          ? JSON.parse(data.position)
          : { x: 0, y: 1, z: 0 };
        data.parents = data.parents ? data.parents.split(',') : [];
        return data;
      });

      return {
        ...family,
        tree,
      };
    } catch (error) {
      return error;
    }
  },
  async save(data: any) {
    try {
      const family = await Family.create(data);
      return family;
    } catch (error) {
      return error;
    }
  },
};
