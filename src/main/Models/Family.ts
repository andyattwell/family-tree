import { Model } from 'sequelize';
import sequelize from '../utils/sequelize';
import familySchema from './familySchema';

export default class Family extends Model {}

Family.init(familySchema, {
  sequelize,
  modelName: 'Family',
});

(async () => {
  try {
    // await Family.sync({ force: true });
    // await Family.sync({ alter: true });
  } catch (error) {
    console.log('ERROR', error);
  }
})();
