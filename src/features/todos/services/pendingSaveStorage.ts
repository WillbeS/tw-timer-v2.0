import { getObjFromStorage, saveToStorage } from '../../../services/storageManager';
import { TasksById } from '../data/types';

const STORAGE_KEY = 'pendingForSave';

export const getPendingSaveFromStorage = () => getObjFromStorage(STORAGE_KEY);

export const savePendingSaveToStorage = (tasks: TasksById) => {
  saveToStorage(STORAGE_KEY, tasks);
};
