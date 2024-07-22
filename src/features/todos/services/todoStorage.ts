import { getObjFromStorage, saveToStorage } from '../../../services/storageManager';
import { TaskData, TasksById } from '../data/types';

const STORAKE_KEY_TASKS = {
  active: 'todos',
  completed: 'completed',
};

export const getTasksFromStorage = () => {
  const byId: TasksById = getObjFromStorage(STORAKE_KEY_TASKS.active);
  const completed: TasksById = getObjFromStorage(STORAKE_KEY_TASKS.completed);

  return {
    byId,
    completed,
  };
};

export const saveTasksToStorage = (
  tasks: TasksById | null = null,
  completed: TasksById | null = null,
) => {
  if (tasks) {
    saveToStorage(STORAKE_KEY_TASKS.active, tasks);
  }

  if (completed) {
    saveToStorage(STORAKE_KEY_TASKS.completed, completed);
  }
};

export const isDuplicate = (newTask: TaskData) => {
  const { byId } = getTasksFromStorage();
  for (const id in byId) {
    const task = byId[id];
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
