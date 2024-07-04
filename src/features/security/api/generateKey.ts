import { api } from '../../../api';

export const generateKey = async () => {
  const keyData: { token: string; adminId: string } = await api.postNew('key', {});

  return keyData;
};
