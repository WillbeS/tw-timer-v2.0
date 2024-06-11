import { api } from '../../../api';

export const deleteTask = async (id: string, apiKey: string) => {
  const response = await api.delete('timer/tasks/' + id, apiKey);

  // TODO - the server should not throw an error if a task is not found
  // we don't care that it doesn't exist there since we want to delete it anyway
  // on this side it's hard to tell the exact cause!
  if (!response.ok) {
    throw new Error('There was a problem connecting to the server.');
  }
};
