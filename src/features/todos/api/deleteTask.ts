import { REMOTE_URL } from '../../../data/constants';

export const deleteTask = async (id: string, apiKey: string) => {
  const url = REMOTE_URL + '/timer/tasks/' + id;

  const response = await fetch(url, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'X-Custom-Auth': apiKey,
    },
  });

  // TODO - the server should not throw an error if a task is not found
  // we don't care that it doesn't exist there since we want to delete it anyway
  // on this side it's hard to tell the exact cause!
  if (!response.ok) {
    throw new Error('There was a problem connecting to the server.');
  }
};
