import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';
import { app } from 'electron';
import isDev from './isDev';

const path = require('path');

const dbPath = isDev
  ? path.join(__dirname, '..', 'data')
  : app.getPath('userData');
// const dbPath = app.getPath('userData');
const dbName = 'database.sqlite';
const fullPath = path.join(dbPath, dbName);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: fullPath,
  logging: false,
});

export default sequelize;
