import { TaskData } from '../data/types';
import { REMOTE_URL } from '../../../data/constants';

export const saveTasks = async (tasks: TaskData[], apiKey: string) => {
  try {
    const url = REMOTE_URL + '/timer/tasks';

    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(tasks),
      headers: {
        Accept: 'application/json',
        'X-Custom-Auth': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Error saving tasks, responce status code: ' + response.status);
    }

    return true;
  } catch (error) {
    console.log(error); // later log it on the server

    return false;
  }
};
