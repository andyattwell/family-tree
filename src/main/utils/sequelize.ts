import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';

const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: dbPath,
  logging: false,
});

export default sequelize;
