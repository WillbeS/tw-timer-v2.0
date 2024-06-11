import { api } from '../../../api';

export const removeKey = async (key: string, adminId: string) => {
  const response = await api.delete('key', `${key}${adminId}`);

  if (response.status === 401) {
    throw new Error('Invalid key! Please check your data and try again!');
  }

  if (!response.ok) {
    console.log('Error deleting a key, response status code: ' + response.status);
    throw new Error('There was a problem connecting to the server. Please try again later.');
  }
};
