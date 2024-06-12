import { getObjFromStorage, saveToStorage } from '../../../services/storageManager';
import { TaskData, TasksById } from '../data/types';

const STORAGE_KEY = 'todos';

export const getTasksFromStorage = () => getObjFromStorage(STORAGE_KEY);

export const saveTasksToStorage = (tasks: TasksById) => {
  saveToStorage(STORAGE_KEY, tasks);
};

export const isDuplicate = (newTask: TaskData) => {
  const tasks: TasksById = getTasksFromStorage();
  for (const id in tasks) {
    const task = tasks[id];
    if (
      newTask.message === task.message &&
      newTask.type === task.type &&
      newTask.dueMs === task.dueMs &&
      newTask.world === task.world
    ) {
      return true;
    }
  }

  return false;
};
