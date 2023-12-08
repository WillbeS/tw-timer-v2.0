import { REMOTE_URL } from '../data/constants';
import { ResponseBodyData, VillageData } from '../data/types';

export const fetchVillages = async (world: string, coords: string[]) => {
  const url = REMOTE_URL + '/villages/' + world;

  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify(coords),
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;
  assertIsVillageData(body);

  return body;
};

// If all workds this will be deleted
// export const fetchByCoords = async (world: string, coords: string[]) => {
//   const url = getUrl('village', world, 'coords', coords.join(','));

//   const response = await fetch(url, {
//     headers: {
//       Accept: 'application/json',
//     },
//   });

//   const body = (await response.json()) as unknown;
//   assertIsResponseBody(body);

//   if (!body.data) {
//     throw new Error(body.message);
//   }

//   assertIsVillageData(body.data);
//   return body.data;
// };

const getUrl = (type: string, world: string, key: string, val: string) => {
  //eample url
  //https://twtools.vvillbes.eu/serverdata/?type=village&world=en131&key=coords&val=543|681
  return `${REMOTE_URL}?type=${type}&world=${world}&key=${key}&val=${val}`;
};

export function assertIsResponseBody(bodyData: unknown): asserts bodyData is ResponseBodyData {
  if (typeof bodyData !== 'object') {
    throw new Error("posts isn't an array");
  }

  if (!bodyData) return;

  if (!('data' in bodyData) && !('error' in bodyData)) {
    throw new Error('Response must contain either error or data');
  }

  if (!('message' in bodyData)) {
    throw new Error('Response must contain a message');
  }

  if (typeof bodyData.message !== 'string') {
    throw new Error('Message is not a string');
  }
}

export function assertIsVillageData(data: unknown): asserts data is VillageData[] {
  if (!Array.isArray(data)) {
    throw new Error("Data isn't an array");
  }

  if (data.length === 0) return;

  for (const datum of data) {
    assertPropExists(datum, 'bonus');
    assertPropExists(datum, 'id');
    assertPropExists(datum, 'name');
    assertPropExists(datum, 'playerId');
    assertPropExists(datum, 'points');
    assertPropExists(datum, 'x');
    assertPropExists(datum, 'y');

    for (const propName in datum) {
      if (typeof propName !== 'string') {
        throw new Error(`${propName} is not a string`);
      }
    }
  }
}

export const assertPropExists = (data: object, propName: string) => {
  if (!(propName in data)) {
    throw new Error(`Data doesn't contain ${propName}`);
  }
};
