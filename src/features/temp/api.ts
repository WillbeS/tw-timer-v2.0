import { Todo } from '../todos/data/types';
import { assertIsTasks } from '../todos/api/getTasks';

//const remoteURL = 'https://127.0.0.1:8000/api';
const remoteURL = 'https://www.vvillbes.eu/api';

export const fetchWorlds = async () => {
  const url = remoteURL + '/tw/worlds';

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;

  return body;
};

export const fetchVillages = async (world: string, coords: string) => {
  const url = remoteURL + '/tw/villages/' + world;

  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify(coords),
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;

  return body;
};

export const fetchTasks = async () => {
  const url = remoteURL + '/tw/timer/tasks';

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;
  assertIsTasks(body);
  return body;
};

export const saveTasks = async (tasks: Todo[]) => {
  const url = remoteURL + '/tw/timer/tasks';

  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify(tasks),
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;

  return body;
};

export const editTask = async (task: Todo) => {
  const url = remoteURL + '/tw/timer/tasks/' + task.id;

  const response = await fetch(url, {
    method: 'put',
    body: JSON.stringify(task),
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;

  return body;
};

export const deleteTask = async (id: string) => {
  const url = remoteURL + '/tw/timer/tasks/' + id;

  const response = await fetch(url, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;

  return body;
};
