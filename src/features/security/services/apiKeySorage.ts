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
    return getApiKeyFromOldStorage();
  }

  return JSON.parse(apiKey) as ApiKey;
};

// This is to support legacy code
const getApiKeyFromOldStorage = (): ApiKey | undefined => {
  const adminIds = getAdminIds();
  const tokens = getTokens();

  if (Object.keys(adminIds).length > 0) {
    const world = Object.keys(adminIds)[0];

    return {
      token: tokens[world],
      adminId: adminIds[world],
    };
  }

  if (Object.keys(tokens).length > 0) {
    return {
      token: Object.keys(tokens)[0],
      adminId: undefined,
    };
  }

  return undefined;
};

export const getTokens = () => {
  const connected = localStorage.getItem('connected_worlds');

  if (connected) {
    return JSON.parse(connected);
  }

  return {};
};

export const getAdminIds = () => {
  const connectedIds = localStorage.getItem('connected_ids');

  if (connectedIds) {
    return JSON.parse(connectedIds);
  }

  return {};
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
