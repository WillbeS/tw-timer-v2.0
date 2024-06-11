import { TaskData } from '../data/types';
import { api } from '../../../api';

export const saveTasks = async (tasks: TaskData[], apiKey: string) => {
  const response = await api.post('timer/tasks', tasks, apiKey);

  if (!response.ok) {
    throw new Error('Error saving tasks, responce status code: ' + response.status);
  }
};
