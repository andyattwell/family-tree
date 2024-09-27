import { ipcRequest } from '../helpers';
import { Family } from '../types';

export default {
  getFamilies: async () => {
    return ipcRequest('families', null);
  },
  getFamily: async (familyID: number) => {
    return ipcRequest('family', familyID);
  },
  savePerson: async (data: any) => {
    return ipcRequest('people-save', data);
  },
};
