import { getObjFromStorage, saveToStorage } from '../../../services/storageManager';
import { PendingTasks } from '../data/types';

const STORAGE_KEY = 'pending';

export const getPendingFromStorage = () => getObjFromStorage(STORAGE_KEY);

export const savePendingToStorage = (pendingTasks: PendingTasks) => {
  saveToStorage(STORAGE_KEY, pendingTasks);
};
