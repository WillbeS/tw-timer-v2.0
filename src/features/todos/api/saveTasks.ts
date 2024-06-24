import { TaskData } from '../data/types';
import { api } from '../../../api';

export const saveTasks = async (tasks: TaskData[], apiKey: string) => {
  const response = await api.post('timer/tasks', tasks, apiKey);

  if (!response.ok) {
    const errorMessage = await response.json();
    console.log(errorMessage + '; responce status code: ' + response.status);
    throw new Error(errorMessage);
  }
};
