import { REMOTE_URL } from '../data/constants';
import { getWorldAdminId, getWorldKey, removeAdminId } from '../utils/api';

export const validateKey = async (worldTag: string, key: string): Promise<string> => {
  //todo...
  const url = REMOTE_URL + `/${worldTag}/key`;

  console.log('Confirming existing key!!!');

  const response = await fetch(url, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'X-Custom-Auth': key,
    },
  });

  if (response.status < 200 || response.status > 299) {
    throw new Error('Error validating the key, response status code: ' + response.status);
  }

  return response.json();
};

export const generateNewKey = async (worldTag: string): Promise<string> => {
  const url = REMOTE_URL + `/${worldTag}/key`;

  console.log('Generating new key!!!');

  const response = await fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status < 200 || response.status > 299) {
    throw new Error('Error generating key, response status code: ' + response.status);
  }

  const keyData: { token: string; adminId: string } = await response.json();

  localStorage.setItem('connected_ids', JSON.stringify({ [worldTag]: keyData.adminId }));

  return keyData.token;
};

export const removeKey = async (worldTag: string) => {
  const url = REMOTE_URL + '/key';
  const adminId = getWorldAdminId(worldTag);

  if (!adminId) return;

  const apiKey = getWorldKey(worldTag);

  const response = await fetch(url, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'X-Custom-Auth': `${apiKey}${adminId}`,
    },
  });

  if (response.status < 200 || response.status > 299) {
    throw new Error('Error deleting key, response status code: ' + response.status);
  }

  removeAdminId(worldTag);
};
