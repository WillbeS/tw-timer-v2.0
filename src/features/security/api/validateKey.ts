import { api } from '../../../api';

export const validateKey = async (token: string): Promise<string> => {
  const response = await api.get('key', token);

  if (response.status === 401) {
    throw new Error('Invalid key! Please check your data and try again!');
  }

  if (!response.ok) {
    console.log('Error generating key, response status code: ' + response.status);
    throw new Error('There was a problem connecting to the server. Please try again later.');
  }

  return response.json();
};
