import * as THREE from 'three';

export interface Person {
  id: string;
  uid?: string;
  name?: string;
  position?: THREE.Vector3;
  parents?: Array<Person>;
  children?: Array<Person>;
}

export interface Family {
  id: number;
  title: string;
  tree: Person[];
}

export interface LineProps {
  start: number;
  end: number;
}

export interface MenuProps {
  item: Person;
  position: THREE.Vector2;
}
