import { Todo } from '../data/types';
import { REMOTE_URL } from '../../../data/constants';
import { assertIsTaskData } from '../data/typeAsserts';

export const fetchTasks = async (): Promise<Todo[]> => {
  try {
    const url = REMOTE_URL + '/timer/tasks';

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status < 200 || response.status > 299) {
      throw new Error('Error fetching tasks, responce status code: ' + response.status);
    }

    const body = (await response.json()) as unknown;
    assertIsTaskDataArr(body);

    return body;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export function assertIsTaskDataArr(tasksData: unknown): asserts tasksData is Todo[] {
  if (!Array.isArray(tasksData)) {
    throw new Error("taskData isn't an array");
  }
  if (tasksData.length === 0) {
    return;
  }

  tasksData.forEach((datum) => {
    assertIsTaskData(datum);
  });
}
