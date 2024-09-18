import { api } from '../../../api';

// needs to remove the adminID
export const generateKey = async () => {
  const keyData: { token: string; adminId: string } = await api.post('key', {});

  return keyData;
};
