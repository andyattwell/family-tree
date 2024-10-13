import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize';

const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  personId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'People',
      key: 'id',
    },
  },
  parentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'People',
      key: 'id',
    },
  },
};

class PersonParents extends Model {}

PersonParents.init(schema, {
  sequelize,
  modelName: 'Person_Parents',
  timestamps: false,
});

(async () => {
  try {
    // await PersonParents.sync({ force: true });
    await PersonParents.sync();
  } catch (error) {
    console.log('ERROR', error);
  }
})();

export default PersonParents;
