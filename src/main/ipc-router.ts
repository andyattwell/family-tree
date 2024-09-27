import { ipcMain } from 'electron';
import PersonController from './Controllers/PersonController';
import FamilyController from './Controllers/FamilyController';

const routes = [
  {
    channel: 'ipc-people-save',
    callback: PersonController.save,
  },
  {
    channel: 'ipc-people',
    callback: PersonController.all,
  },
  {
    channel: 'ipc-families-save',
    callback: FamilyController.save,
  },
  {
    channel: 'ipc-families',
    callback: FamilyController.all,
  },
  {
    channel: 'ipc-family',
    callback: FamilyController.get,
  },
];

routes.forEach((route) => {
  ipcMain.on(route.channel, async (event, arg) => {
    console.log(route.channel);
    const responseChannel = `${route.channel}-response`;
    try {
      const response = await route.callback(arg);
      event.reply(responseChannel, response);
    } catch (error) {
      event.reply(responseChannel, error);
    }
  });
});
