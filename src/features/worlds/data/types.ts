import { AssertData, assertPropExists, assertPropIsCorrectType } from '../../../data/typeAsserts';

export type WorldData = {
  name: string;
  tag: string;
  speed: number;
};

export function assertIsWorldData(data: unknown): asserts data is WorldData {
  const worldData: AssertData = {
    id: 'number',
    name: 'string',
    tag: 'string',
    speed: 'number',
  };

  if (!data || typeof data !== 'object') {
    throw new Error(`The data is not an object`);
  }

  Object.keys(worldData).forEach((key) => {
    assertPropExists(data, key);
  });

  assertPropIsCorrectType(data, worldData);
}
