import { DataTypes } from 'sequelize';

export default {
  familyId: {
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
    type: DataTypes.TEXT,
    length: 'long',
  },
  position: {
    type: DataTypes.STRING,
  },
};
