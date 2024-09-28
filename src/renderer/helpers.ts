import { Person } from './types';

export function getMinPosition(item: Person, offset: number = 0) {
  let min = -offset;
  const height = 2;
  if (item.parents) {
    item.parents.forEach((p) => {
      const relativeZ = (p.position?.z || 0) + height;
      if (relativeZ > min) {
        min = relativeZ;
      }
    });
  }
  return min;
}

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
