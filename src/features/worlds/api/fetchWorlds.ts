import { api } from '../../../api';
import { WorldData, assertIsWorldData } from '../data/types';

// Delete when safe
export const fetchWorlds = async () => {
  try {
    const response = await api.get('worlds');

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
