import { Person } from './types';

export const ipcRequest = async (route: string, data: any | null) => {
  return new Promise((resolve) => {
    const fullRoute = `ipc-${route}`;
    window.electron.ipcRenderer.sendMessage(fullRoute, data);

    window.electron.ipcRenderer.once(
      `${fullRoute}-response`,
      (response: any) => {
        return resolve(response);
      },
    );
  });
};
