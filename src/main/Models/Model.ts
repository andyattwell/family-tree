import { all, find, insert, update, dropTable, createTable } from '../utils/db';
// import { DataTypes, Model } = from 'sequelize';
// import sequelize from '../sequelize';

export interface FieldType {
  name: string;
  type: string;
}

export default class Model {
  id: string | undefined = undefined;

  // tableName: string = '';

  schema: FieldType[] = [];

  tableName: string | undefined;

  constructor(reload: boolean) {
    createTable(this.tableName, this.schema);
    if (reload) {
      this.recreate();
    }
  }

  static async all(tableName: string) {
    return all(tableName);
  }

  async find(id: string) {
    return find(this.tableName, id);
  }

  async save(data: any) {
    return insert(this.tableName, data);
  }

  async update(data: any) {
    data.id = this.id;
    try {
      console.log('save', data);
      await update(this.tableName, data);
      return data.id ? this.find(data.id) : data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async recreate() {
    dropTable(this.tableName)
      .then(() => {
        return createTable(this.tableName, this.schema);
      })
      .catch((error: any) => {
        console.log('Error', error);
      });
  }
}
