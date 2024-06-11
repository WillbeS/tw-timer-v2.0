import { VillageData } from '../data/types';
import { assertIsVillageData } from '../data/typeAsserts';
import { api } from '../../../api';

export const getVillages = async (world: string, coords: string[]): Promise<VillageData[]> => {
  const response = await api.post('villages/' + world, coords);

  if (!response.ok) {
    throw new Error('Error fetching villages, responce status code: ' + response.status);
  }

  const body = (await response.json()) as unknown;
  assertIsVillageDataArray(body);

  return body;
};

export function assertIsVillageDataArray(data: unknown): asserts data is VillageData[] {
  if (!Array.isArray(data)) {
    throw new Error("Data isn't an array");
  }

  if (data.length === 0) return;

  for (const datum of data) {
    assertIsVillageData(datum);
  }
}
