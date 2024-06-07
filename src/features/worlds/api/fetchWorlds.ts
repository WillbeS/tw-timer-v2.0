import { REMOTE_URL } from '../../../data/constants';
import { WorldData, assertIsWorldData } from '../data/types';

export const fetchWorlds = async () => {
  try {
    const url = REMOTE_URL + '/worlds';

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('There was a network problem, status code: ' + response.status);
    }

    const body = (await response.json()) as unknown;
    assertIsWorldDataArr(body);

    return body;
  } catch (error) {
    console.log(error);
  }
};

function assertIsWorldDataArr(worldData: unknown): asserts worldData is WorldData[] {
  if (!Array.isArray(worldData)) {
    throw new Error("worldData isn't an array");
  }
  if (worldData.length === 0) {
    return;
  }

  worldData.forEach((datum) => {
    assertIsWorldData(datum);
  });
}
