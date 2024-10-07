import { Model } from 'sequelize';
import { Vector3 } from 'three';
import sequelize from '../utils/sequelize';
import personSchema from './personSchema';
import PersonParents from './PersonParents';
import Family from './Family';

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
  spouces?: Array<string>;
}

export default class Person extends Model {}

Person.init(personSchema, {
  sequelize,
  modelName: 'Person',
});

Person.belongsTo(Family, {
  foreignKey: 'familyId',
  as: 'family',
});

Family.hasMany(Person, {
  foreignKey: 'familyId',
  as: 'members',
});

Person.belongsToMany(Person, {
  through: PersonParents,
  foreignKey: 'personId',
  as: 'parents',
});

Person.belongsToMany(Person, {
  through: PersonParents,
  foreignKey: 'parentId',
  as: 'children',
});

(async () => {
  try {
    // await Person.sync();
    // await Person.sync({ force: true });
    // const family = await Family.create({ title: 'Test family' });
    // const person1 = await Person.create({
    //   name: 'Person 1',
    //   familyId: family.dataValues.id,
    // });
    // const person2 = await Person.create({
    //   name: 'Person 2',
    //   familyId: family.dataValues.id,
    // });
    // const person3 = await Person.create({
    //   name: 'Person 2',
    //   familyId: family.dataValues.id,
    // });
    // person3.addParents([person1, person2]);
    // await Person.sync({ alter: true })
  } catch (error) {
    console.log('ERROR', error);
  }
})();
