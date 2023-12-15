import { REMOTE_URL } from '../data/constants';
import { WorldData } from '../data/types';
import { assertIsWorldData } from '../data/typeAsserts';

export const fetchWorlds = async (): Promise<WorldData[]> => {
  try {
    const url = REMOTE_URL + '/worlds';

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    const body = (await response.json()) as unknown;
    assertIsWorldDataArr(body);

    return body;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export function assertIsWorldDataArr(worldData: unknown): asserts worldData is WorldData[] {
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

// export function assertIsWorldData(data: unknown): asserts data is WorldData[] {
//   if (!Array.isArray(data)) {
//     throw new Error("Data isn't an array");
//   }

//   if (data.length === 0) return;

//   for (const datum of data) {
//     assertPropExists(datum, 'name');
//     assertPropExists(datum, 'tag');
//     assertPropExists(datum, 'speed');
//   }
// }

// export const assertPropExists = (data: object, propName: string) => {
//   if (!(propName in data)) {
//     throw new Error(`Data doesn't contain ${propName}`);
//   }
// };
