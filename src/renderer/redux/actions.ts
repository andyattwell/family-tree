import { Vector3 } from "three";
import { SET_TREE, ADD_PERSON, UPDATE_POSITION } from "./actionTypes";
import Person from "../../main/Models/Person";

let nextTodoId = 0;

export const addPerson = (data: Person) => ({
  type: ADD_PERSON,
  payload: {
    id: nextTodoId + 1,
    ...data,
  },
});

export const setTree = (tree: Person[]) => ({
  type: SET_TREE,
  payload: {
    tree,
  },
});

export const updatePositions = (
  id: number,
  x: number,
  y: number,
  z: number,
  offset: number,
) => ({
  type: UPDATE_POSITION,
  payload: {
    id,
    x,
    y,
    z,
    offset,
  },
});
// export const toggleTodo = id => ({
//   type: TOGGLE_TODO,
//   payload: { id },
// });

// export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
