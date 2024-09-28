// import { VISIBILITY_FILTERS } from "../constants";

export const getTreeState = (store) => store.tree;

export const getTreeList = (store) =>
  getTreeState(store) ? getTreeState(store).byIds : [];
// getTreeState(store) ? getTreeState(store).allIds : [];

export const getPersonById = (store, id: number) =>
  getTreeState(store) ? { ...getTreeState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
// export const getTree = store =>
//   getTreeList(store).map((id: number) => getPersonById(store, id));
export const getTree = store => getTreeList(store);

// export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
//   const allTodos = getTodos(store);
//   switch (visibilityFilter) {
//     case VISIBILITY_FILTERS.COMPLETED:
//       return allTodos.filter(todo => todo.completed);
//     case VISIBILITY_FILTERS.INCOMPLETE:
//       return allTodos.filter(todo => !todo.completed);
//     case VISIBILITY_FILTERS.ALL:
//     default:
//       return allTodos;
//   }
// };
