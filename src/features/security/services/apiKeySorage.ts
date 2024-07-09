import { saveToStorage } from '../../../services/storageManager';
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

  //this is to fix that Object.keys bug
  if (apiKey) {
    const newKey = JSON.parse(apiKey) as ApiKey;

    if (newKey.token.length > 10) {
      return newKey;
    }
  }

  console.log('Searching for old keys!!!');
  const oldKey = getApiKeyFromOldStorage();

  if (oldKey) {
    saveApiKeyToStorage(oldKey);
  }

  return oldKey;
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
      token: Object.values(tokens)[0] as string,
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
