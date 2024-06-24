import { TaskData } from '../data/types';
import { assertIsTaskData } from '../data/typeAsserts';
import { api } from '../../../api';

// export const fetchTasks = async (apiKey: string): Promise<TaskData[]> => {
//   const response = await api.get('timer/tasks', apiKey);

//   if (!response.ok) {
//     console.log(await response.json());
//     throw new Error('' + response.status);
//   }

//   const body = (await response.json()) as unknown;
//   assertIsTaskDataArr(body);

//   return body;
// };

// export function assertIsTaskDataArr(tasksData: unknown): asserts tasksData is TaskData[] {
//   if (!Array.isArray(tasksData)) {
//     throw new Error("taskData isn't an array");
//   }
//   if (tasksData.length === 0) {
//     return;
//   }

//   tasksData.forEach((datum) => {
//     assertIsTaskData(datum);
//   });
// }
