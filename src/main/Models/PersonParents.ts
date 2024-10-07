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

// const PersonParents = sequelize.define('PersonParents', schema);

class PersonParents extends Model {}

PersonParents.init(schema, {
  sequelize,
  modelName: 'Person_Parents',
  timestamps: false,
});

(async () => {
  try {
    // await Person.sync();
    // await PersonParents.sync({ force: true });
  } catch (error) {
    console.log('ERROR', error);
  }
})();

export default PersonParents;
