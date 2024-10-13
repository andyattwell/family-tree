import { ipcRequest } from '../helpers';

export default {
  getPeople: async () => {
    return ipcRequest('people', null);
  },
  getFamilies: async () => {
    return ipcRequest('families', null);
  },
  saveFamily: async (data: any) => {
    return ipcRequest('families-save', data);
  },
  getFamily: async (familyId: number) => {
    return ipcRequest('family', familyId);
  },
  deleteFamily: async (familyId: number) => {
    return ipcRequest('family-delete', familyId);
  },
  savePerson: async (data: any) => {
    return ipcRequest('people-save', data);
  },
  deletePerson: async (id: number) => {
    return ipcRequest('people-delete', id);
  },
  addParent: async (data: any) => {
    return ipcRequest('people-add-parent', data);
  },
  removeParent: async (data: any) => {
    return ipcRequest('people-remove-parent', data);
  },
};
