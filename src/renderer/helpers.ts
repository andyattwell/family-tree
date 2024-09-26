import { Person } from './types';

export default function getMinPosition(item: Person) {
  let min = 0;
  const height = 1;
  if (item.parents) {
    item.parents.forEach((p) => {
      if (p.position.z + height > min) {
        min = p.position.z + height;
      }
    });
  }
  return min;
}
