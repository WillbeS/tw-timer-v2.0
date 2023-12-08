import { NewTodo, SavedTodo, Todo } from '../data/types';
import { REMOTE_URL } from '../../../data/constants';

// export async function saveTask(newTaskData: NewTodo) {
//   const response = await fetch(process.env.REACT_APP_API_URL!, {
//     method: 'POST',
//     body: JSON.stringify(newTaskData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const body = (await response.json()) as unknown;
//   assertIsSavedTask(body);

//   return { ...newTaskData, ...body };
// }

export const saveTasks = async (tasks: Todo[]) => {
  console.log('Should save on the server!!!!!!!!!!!!!!!!!!!');
  const url = REMOTE_URL + '/timer/tasks';

  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify(tasks),
    headers: {
      Accept: 'application/json',
    },
  });

  const body = (await response.json()) as unknown;
  console.log(body);
  return body;
};

// Still undecided on the return data type

// function assertIsSavedTask(task: any): asserts task is SavedTodo {
//   if (!('id' in task)) {
//     throw new Error("post doesn't contain id");
//   }
//   if (typeof task.id !== 'string') {
//     throw new Error('id is not a string');
//   }
// }
