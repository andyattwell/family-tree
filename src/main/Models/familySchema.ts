import { DataTypes } from 'sequelize';

export default {
  title: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.TEXT,
    length: 'long',
  },
  backgroundImage: {
    type: DataTypes.TEXT,
    length: 'long',
  },
  backgroundColor: {
    type: DataTypes.STRING,
  },
  backgroundSize: {
    type: DataTypes.STRING,
  },
  backgroundPosition: {
    type: DataTypes.STRING,
  },
};
