import { Todo } from '../data/types';
import { REMOTE_URL } from '../../../data/constants';

export const fetchTasks = async () => {
  const url = REMOTE_URL + '/timer/tasks';

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;
  assertIsTasks(body);
  return body;
};

export function assertIsTasks(tasksData: unknown): asserts tasksData is Todo[] {
  if (!Array.isArray(tasksData)) {
    throw new Error("posts isn't an array");
  }
  if (tasksData.length === 0) {
    return;
  }

  //   export type TaskData = {
  //     alarmOffset: number;
  //     dueMs: number;
  //     id: string;
  //     isRepeating: boolean;
  //     message: string;
  //     type: string;
  //     world: string;
  //   };

  tasksData.forEach((task) => {
    if (!('alarmOffset' in task)) {
      throw new Error("task doesn't contain alarmOffset");
    }
    if (typeof task.alarmOffset !== 'number') {
      throw new Error('alarmOffset is not a number');
    }

    if (!('dueMs' in task)) {
      throw new Error("task doesn't contain dueMs");
    }
    if (typeof task.dueMs !== 'number') {
      throw new Error('dueMs is not a number');
    }

    if (!('id' in task)) {
      throw new Error("task doesn't contain id");
    }
    if (typeof task.id !== 'string') {
      throw new Error('id is not a string');
    }

    // TODO the rest when doing refactoring
  });
}
