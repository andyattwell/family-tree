import { DataTypes } from 'sequelize';

export default {
  familyID: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  birthdate: {
    type: DataTypes.DATE,
  },
  dod: {
    type: DataTypes.DATE,
  },
  gender: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  photo: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.TEXT,
  },
  parents: {
    type: DataTypes.STRING,
  },
  children: {
    type: DataTypes.STRING,
  },
};
