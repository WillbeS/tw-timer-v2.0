import { REMOTE_URL } from '../../../data/constants';

export const deleteTask = async (id: string) => {
  const url = REMOTE_URL + '/timer/tasks/' + id;

  const response = await fetch(url, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;
  console.log(body);
  return body;
};
