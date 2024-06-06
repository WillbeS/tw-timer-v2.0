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

    if (response.ok || response.status === 404) {
      return true;
    }

    throw new Error('' + response.status);
  } catch (error) {
    //todo log the error

    return false;
  }
};
