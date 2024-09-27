import Person from '../Models/Person';

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
    try {
      if (data.id) {
        const result = await Person.update(data, {
          where: {
            id: data.id,
          },
        });
        return result;
      }
      return (await Person.create(data)).dataValues;
    } catch (error) {
      console.log({ error });
      return error;
    }
  },
};
