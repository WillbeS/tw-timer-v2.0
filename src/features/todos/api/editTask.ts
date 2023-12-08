import { REMOTE_URL } from '../../../data/constants';
import { Todo } from '../data/types';

export const editTask = async (task: Todo) => {
  const url = REMOTE_URL + '/timer/tasks/' + task.id;

  const response = await fetch(url, {
    method: 'put',
    body: JSON.stringify(task),
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;
  console.log(body);
  return body;
};
