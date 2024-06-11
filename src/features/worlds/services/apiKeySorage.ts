import { getObjFromStorage, saveToStorage } from '../../../services/storageManager';

export const getKeyFromStorage = (worldTag: string): string | undefined => {
  const connected = localStorage.getItem('connected_worlds');

  if (connected) {
    return JSON.parse(connected)[worldTag];
  }
};

export const getAdminIdFromStorage = (worldTag: string): string | undefined => {
  const connectedIds = localStorage.getItem('connected_ids');

  if (connectedIds) {
    return JSON.parse(connectedIds)[worldTag];
  }
};

export const removeAdminIdFromStorage = (worldTag: string) => {
  const connectedIds = getObjFromStorage('connected_ids');
  delete connectedIds[worldTag];
  saveToStorage('connected_ids', connectedIds);
};
