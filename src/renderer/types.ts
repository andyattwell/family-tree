import * as THREE from 'three';

export interface Person {
  id: number;
  uid?: string;
  familyID?: number;

  name?: string;
  birthdate?: string;
  dod?: string;
  gender?: string;
  description?: string;
  photo?: string;

  position: THREE.Vector3;
  parents: Array<Person> | string;
  children?: Array<Person>;
}

export interface Family {
  id: number;
  title: string;
  tree: Person[];
}

export interface LineProps {
  start: number[];
  end: number[];
}

export interface MenuProps {
  item: Person;
  position: THREE.Vector2;
}
