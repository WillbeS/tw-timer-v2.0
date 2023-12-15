import { AssertData, assertPropExists, assertPropIsCorrectType } from '../../../data/typeAsserts';

import { Todo } from './types';
import { VillageData } from './types';

export function assertIsVillageData(data: unknown): asserts data is VillageData {
  const villageData: AssertData = {
    bonus: 'string',
    id: 'string',
    name: 'string',
    playerId: 'string',
    points: 'string',
    x: 'string',
    y: 'string',
  };

  if (!data || typeof data !== 'object') {
    throw new Error(`The data is not an object`);
  }

  Object.keys(villageData).forEach((key) => {
    assertPropExists(data, key);
  });

  assertPropIsCorrectType(data, villageData);
}

export function assertIsTaskData(data: unknown): asserts data is Todo {
  console.log(data);
  const taskData: AssertData = {
    alarmOffset: 'number',
    dueMs: 'number',
    id: 'string',
    isRepeating: 'boolean',
    message: 'string',
    type: 'string',
    world: 'string',
  };

  if (!data || typeof data !== 'object') {
    throw new Error(`The data is not an object`);
  }

  Object.keys(taskData).forEach((key) => {
    assertPropExists(data, key);
  });

  assertPropIsCorrectType(data, taskData);
}
