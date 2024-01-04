import { REMOTE_URL } from '../../../data/constants';
import { TaskData } from '../data/types';

export const editTask = async (task: TaskData): Promise<boolean> => {
  try {
    const url = REMOTE_URL + '/timer/tasks/' + task.id;

    const response = await fetch(url, {
      method: 'put',
      body: JSON.stringify(task),
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status < 200 || response.status > 299) {
      throw new Error('Error editing tasks, responce status code: ' + response.status);
    }
  } catch (error) {
    console.log(error); // later log it on the server
    return false;
  }

  return true;
};
