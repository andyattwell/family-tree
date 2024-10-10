// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'ipc-example'
  | 'ipc-people-save'
  | 'ipc-people'
  | 'ipc-people-response'
  | 'ipc-people-save-response'
  | 'ipc-people-add-parent'
  | 'ipc-people-add-parent-response'
  | 'ipc-people-remove-parent'
  | 'ipc-people-remove-parent-response'
  | 'ipc-people-delete'
  | 'ipc-people-delete-response'
  | 'ipc-families'
  | 'ipc-families-response'
  | 'ipc-families-save'
  | 'ipc-families-save-response'
  | 'ipc-family'
  | 'ipc-family-response'
  | 'ipc-family-delete'
  | 'ipc-family-delete-response'
  | 'ipc-family-update'
  | 'ipc-family-update-response';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
