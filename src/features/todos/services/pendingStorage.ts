import { getObjFromStorage, saveToStorage } from '../../../services/storageManager';
import { PendingTasks, TasksById } from '../data/types';

const STORAGE_KEY = 'pending';

export const STORAGE_KEY_PENDING = {
  DELETE: 'pendingDelete',
  EDIT: 'pendingEdit',
};

export const getPendingFromStorage = (type: string = STORAGE_KEY) => getObjFromStorage(type);

// this will be deleted
export const savePendingToStorage = (pendingTasks: PendingTasks) => {
  saveToStorage(STORAGE_KEY, pendingTasks);
};

export const savePendingDelToStorage = (pendingTasks: TasksById) => {
  saveToStorage(STORAGE_KEY_PENDING.DELETE, pendingTasks);
};

export const savePendingEditToStorage = (pendingTasks: TasksById) => {
  saveToStorage(STORAGE_KEY_PENDING.EDIT, pendingTasks);
};
