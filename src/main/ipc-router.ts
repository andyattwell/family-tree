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
    channel: 'ipc-people-add-parent',
    callback: PersonController.addParent,
  },
  {
    channel: 'ipc-people-remove-parent',
    callback: PersonController.removeParent,
  }
  {
    channel: 'ipc-families-save',
    callback: FamilyController.save,
  },
  {
    channel: 'ipc-people-delete',
    callback: PersonController.destroy,
  },
  {
    channel: 'ipc-families',
    callback: FamilyController.all,
  },
  {
    channel: 'ipc-family',
    callback: FamilyController.get,
  },
  {
    channel: 'ipc-family-delete',
    callback: FamilyController.detroy,
  },
];

routes.forEach((route) => {
  ipcMain.on(route.channel, async (event, arg) => {
    console.log(`CHANNEL ${route.channel}`, arg);
    const responseChannel = `${route.channel}-response`;
    try {
      const response = await route.callback(arg);
      console.log(`CHANNEL ${responseChannel}`, response);
      event.reply(responseChannel, response);
    } catch (error) {
      event.reply(responseChannel, error);
    }
  });
});
