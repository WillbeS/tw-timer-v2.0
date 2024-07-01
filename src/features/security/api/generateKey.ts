import { api } from '../../../api';

export const generateKey = async () => {
  const response = await api.post('key', {});

  if (!response.ok) {
    console.log('Error generating key, response status code: ' + response.status);
    throw new Error('There was a problem connecting to the server. Please try again later.');
  }

  const keyData: { token: string; adminId: string } = await response.json();

  return keyData;
};
