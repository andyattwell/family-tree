import Person from '../Models/Person';
import PersonParents from '../Models/PersonParents';

export default {
  async all() {
    try {
      return Person.findAll();
    } catch (error) {
      return error;
    }
  },
  async save(data: any) {
    if (data.position) {
      data.position = JSON.stringify(data.position);
    }
    console.log({ data });
    try {
      let person;
      if (data.id) {
        await Person.update(data, {
          where: {
            id: data.id,
          },
        });
        person = await Person.findOne({
          where: { id: data.id },
          include: [
            {
              model: Person,
              as: 'parents',
            },
          ],
        });
      } else {
        person = await Person.create(data, {
          include: [
            {
              model: Person,
              as: 'parents',
            },
          ],
        });
      }

      const response = { ...person.dataValues };

      response.parents = person.parents?.map((p: Person) => {
          const pd = { ...p.dataValues };
          pd.position = pd.position
            ? JSON.parse(pd.position)
            : { x: 0, y: 1, z: 0 };
          return pd;
        });

        response.position = data.position
          ? JSON.parse(data.position)
          : { x: 0, y: 1, z: 0 };

      return response;
    } catch (error) {
      console.log({ error });
      return error;
    }
  },

  async addParent({
    personId,
    parentId,
  }: {
    personId: number;
    parentId: number;
  }) {
    try {
      return await PersonParents.create({
        personId,
        parentId,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async removeParent({
    personId,
    parentId,
  }: {
    personId: number;
    parentId: number;
  }) {
    try {
      return await PersonParents.destroy({
        where: {
          personId,
          parentId,
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async destroy(id: number) {
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
  },
};
