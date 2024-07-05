import { VillageData } from '../data/types';

import { api } from '../../../api';

export const getVillages = async (world: string, coords: string[]): Promise<VillageData[]> => {
  return await api.post('villages/' + world, coords);
};
