import { api } from '../../../api';

export const validateKey = async (token: string): Promise<string> => {
  return await api.get('key', token);
};
