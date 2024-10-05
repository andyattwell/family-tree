import { Person } from '../../types';
import { SET_TREE, ADD_PERSON, UPDATE_POSITION } from '../actionTypes';

const initialState = {
  allIds: [],
  byIds: {},
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TREE: {
      const { tree } = action.payload;
      const allIds = tree.map((p: Person) => p.id);
      const byIds: any = {};
      tree.forEach((p: Person) => {
        byIds[p.id || 0] = p;
      });
      return {
        ...state,
        allIds,
        byIds,
      };
    }
    case ADD_PERSON: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            ...content,
          },
        },
      };
    }
    case UPDATE_POSITION: {
      const { id, x, y, z, offset } = action.payload;
      const byIds: any = { ...state.byIds };
      const newByIds: any = {};
      Object.keys(byIds).forEach((pid) => {
        const p = byIds[pid];
        const person = {
          ...p,
          position: { ...p.position },
          parents: [...p.parents],
        };

        if (person.id === id) {
          person.position = { x, y, z };
        }

        if (typeof person.parents === 'object') {
          person.parents = person.parents?.map((parent: any) => {
            const pa = {
              ...parent,
              position: { ...parent.position },
            };
            if (pa.id === id) {
              pa.position = { x, y, z };
              // pa.position = { ...person.position };
            }
            return pa;
          });
        }

        newByIds[person.id] = person;
      });

      return {
        ...state,
        byIds: newByIds,
      };
    }
    default:
      return state;
  }
};
