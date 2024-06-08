import { getArrFromStorage, saveToStorage } from '../../../services/storageManager';

const STORAGE_KEY = 'pendingForDelete';

export const getPendingDelFromStorage = () => getArrFromStorage(STORAGE_KEY);

export const savePendingDelToStorage = (taskIDs: string[]) => {
  saveToStorage(STORAGE_KEY, taskIDs);
};
