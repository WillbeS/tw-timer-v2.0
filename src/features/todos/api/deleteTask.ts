import { REMOTE_URL } from '../../../data/constants';

export const deleteTask = async (id: string, apiKey: string): Promise<boolean> => {
  try {
    const url = REMOTE_URL + '/timer/tasks/' + id;

    const response = await fetch(url, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'X-Custom-Auth': apiKey,
      },
    });

    if (response.status < 200 || response.status > 299) {
      throw new Error('Error deleting tasks, responce status code: ' + response.status);
    }
  } catch (error) {
    console.log(error); // later log it on the server
    return false;
  }

  return true;
};
