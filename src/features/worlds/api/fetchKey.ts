import { api } from '../../../api';
import { saveToStorage } from '../../../services/storageManager';

export const generateKey = async (worldTag: string): Promise<string> => {
  const response = await api.post(`${worldTag}/key`, {});

  if (!response.ok) {
    console.log('Error generating key, response status code: ' + response.status);
    throw new Error('There was a problem connecting to the server. Please try again later.');
  }

  const keyData: { token: string; adminId: string } = await response.json();
  saveToStorage('connected_ids', { [worldTag]: keyData.adminId });

  return keyData.token;
};

export const validateKey = async (worldTag: string, key: string): Promise<string> => {
  const response = await api.get(`${worldTag}/key`, key);

  if (response.status === 401) {
    throw new Error('Invalid key! Please check your data and try again!');
  }

  if (!response.ok) {
    console.log('Error generating key, response status code: ' + response.status);
    throw new Error('There was a problem connecting to the server. Please try again later.');
  }

  return response.json();
};
