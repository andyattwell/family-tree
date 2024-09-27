import { Model } from 'sequelize';
import { Vector3 } from 'three';
import sequelize from '../utils/sequelize';
import personSchema from './personSchema';
// import Model from './Model';

export interface PersonInputType {
  id?: string;
  name?: string;
  birthdate?: string;
  dod?: string;
  gender?: string;
  description?: string;
  photo?: string;
  position?: Vector3;
  parents?: Array<string>;
  children?: Array<string>;
}

export default class Person extends Model {}

Person.init(personSchema, {
  sequelize,
  modelName: 'Person',
});

(async () => {
  try {
    // await Person.sync({ force: true });
    // await Person.sync({ alter: true })
  } catch (error) {
    console.log('ERROR', error);
  }
})();
