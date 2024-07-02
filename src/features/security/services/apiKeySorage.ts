import { getObjFromStorage, saveToStorage } from '../../../services/storageManager';
import { ApiKey } from '../data/types';

const STORAGE_KEY = 'apiKey';

// will replace after migration is done
//export const getApiKeyFromStorage = () => getObjFromStorage(STORAGE_KEY);

export const saveApiKeyToStorage = (key: ApiKey) => {
  saveToStorage(STORAGE_KEY, key);
};

export const removeApiKeyFromStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// temp until the migration from the current system is done
export const getApiKeyFromStorage = () => {
  const apiKey = localStorage.getItem(STORAGE_KEY);

  if (!apiKey) {
    // TODO - look for the ApiKey in the legacy storage
    return;
  }

  return JSON.parse(apiKey) as ApiKey;
};
////////////////////////////////////////////////////////////////////

// export const getKeyFromStorage = (worldTag: string): string | undefined => {
//   const connected = localStorage.getItem('connected_worlds');

//   if (connected) {
//     return JSON.parse(connected)[worldTag];
//   }
// };

// export const getAdminIdFromStorage = (worldTag: string): string | undefined => {
//   const connectedIds = localStorage.getItem('connected_ids');

//   if (connectedIds) {
//     return JSON.parse(connectedIds)[worldTag];
//   }
// };

// export const removeAdminIdFromStorage = (worldTag: string) => {
//   const connectedIds = getObjFromStorage('connected_ids');
//   delete connectedIds[worldTag];
//   saveToStorage('connected_ids', connectedIds);
// };
