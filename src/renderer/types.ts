import * as THREE from 'three';

export interface Person {
  id: number;
  uid?: string;
  familyId?: number;

  name?: string;
  birthdate?: string;
  dod?: string;
  gender?: string;
  description?: string;
  photo?: string;

  position: THREE.Vector3;
  parents: Array<Person>;
  children?: Array<Person>;
}

export interface Family {
  id: number;
  title: string;
  members: Person[];
  photo?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  backgroundSize?: string;
  backgroundPosition?: THREE.Vector3;
}

export interface LineProps {
  start: number[];
  end: number[];
}

export interface MenuProps {
  item: Person;
  position: THREE.Vector2;
}
