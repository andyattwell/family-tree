import { ipcRequest } from '../helpers';
import { Person } from '../types';
// import { Family } from '../types';

export default {
  getFamilies: async () => {
    return ipcRequest('families', null);
  },
  addFamily: async (title: string) => {
    return ipcRequest('families-save', { title });
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
