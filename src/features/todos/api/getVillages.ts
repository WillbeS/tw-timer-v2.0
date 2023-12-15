import { REMOTE_URL } from '../../../data/constants';
import { VillageData } from '../data/types';
import { assertIsVillageData } from '../data/typeAsserts';

export const getVillages = async (world: string, coords: string[]): Promise<VillageData[]> => {
  try {
    const url = REMOTE_URL + '/villages/' + world;

    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(coords),
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status < 200 || response.status > 299) {
      throw new Error('Error fetching villages, responce status code: ' + response.status);
    }

    const body = (await response.json()) as unknown;
    assertIsVillageDataArray(body);

    return body;
  } catch (error) {
    console.log(error);
    return [];
  }
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
