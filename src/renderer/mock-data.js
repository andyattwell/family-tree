import { Vector3 } from 'three';

const data = [
  {
    id: 1,
    title: 'Familia 1',
    tree: [
      {
        position: new Vector3(-1, 0, 0),
        id: 'item1',
      },
      {
        position: new Vector3(1, 0, 0),
        id: 'item2',
      },
      {
        position: new Vector3(4, 0, 3),
        id: 'item3',
        parents: [
          {
            position: new Vector3(-1, 0, 0),
            id: 'item1',
          },
          {
            position: new Vector3(1, 0, 0),
            id: 'item2',
          },
        ],
      },
      {
        position: new Vector3(4, 0, 5),
        id: 'item4',
        parents: [
          {
            position: new Vector3(4, 0, 3),
            id: 'item3',
          },
        ],
      },
    ],
  },
];

export default data;
