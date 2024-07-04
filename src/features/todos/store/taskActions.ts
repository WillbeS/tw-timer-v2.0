import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskData } from '../data/types';
import { api } from '../../../api';
import { RootState } from '../../../store/store';
import { addError, addSuccess } from '../../messages/store/messageSlice';

import { addTasksAction } from './todoSlice';
import { saveTasks } from '../api';
import { generateId } from '../../../utils/stringUtils';
import { ApiKey } from '../../security/data/types';

export const fetchAllTasks = createAsyncThunk<{ tasks: TaskData[] }, void, { rejectValue: null }>(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      //will get this from the api get function
      const apiKey = (thunkAPI.getState() as RootState).connection.apiKey;

      const response = await api.get('timer/tasks', apiKey?.token);

      if (!response.ok) {
        // I'm losing the status code with this, need to check if it's still needed
        const errorMessage =
          response.status === 404 ? "The URL address doesn't exist" : await response.json();
        throw new Error(errorMessage);
      }

      const tasks = (await response.json()) as TaskData[];

      return { tasks };
    } catch (error: any) {
      const dispatch = thunkAPI.dispatch;
      console.log(error.message);
      dispatch(addError(`Error fetching tasks.`));
      return thunkAPI.rejectWithValue(null);
    }
  },
);

// This is the old, will probably delete it
// export const fetchTasks = createAsyncThunk<
//   { world: string; tasks: TaskData[] },
//   string,
//   { rejectValue: null }
// >('tasks/fetchTasks', async (world: string, thunkAPI) => {
//   try {
//     const apiKey = (thunkAPI.getState() as RootState).worlds.connected[world];
//     const response = await api.get('timer/tasks', apiKey);

//     if (!response.ok) {
//       // I'm losing the status code with this, need to check if it's still needed
//       const errorMessage =
//         response.status === 404 ? "The URL address doesn't exist" : await response.json();
//       throw new Error(errorMessage);
//     }

//     const tasks = (await response.json()) as TaskData[];
//     return { world, tasks };
//   } catch (error: any) {
//     const dispatch = thunkAPI.dispatch;
//     console.log(error.message);
//     dispatch(addError(`Error fetching tasks for world  ${world}. ` + error.message));
//     return thunkAPI.rejectWithValue(null);
//   }
// });

//potential bottleneck, need it now for the migration from the old apiKey system, won't need it after that!!!!
export const connectTasks = createAsyncThunk<{ tasks: TaskData[] }, string, { rejectValue: void }>(
  'tasks/savePending',
  async (token: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let pending = Object.values(state.todos.byId).filter((task) => !task.serverId);
      console.log(pending);

      if (pending.length === 0) return { tasks: [] };

      await saveTasks(pending, token);
      thunkAPI.dispatch(addSuccess('You data was successfully saved to the server!'));

      return { tasks: pending };
    } catch (error: any) {
      console.log(error.message);
      thunkAPI.dispatch(addError('Error sving the tasks to the remote server'));
      return thunkAPI.rejectWithValue();
    }
  },
);

//temp, will rename to something else
export const saveTodos = createAsyncThunk<void, { tasks: TaskData[] }, { rejectValue: TaskData[] }>(
  'tasks/saveTasks',
  async ({ tasks }, thunkAPI) => {
    try {
      thunkAPI.dispatch(addTasksAction(tasks));
      const apiKey = (thunkAPI.getState() as RootState).connection.apiKey;

      if (!apiKey) return;

      await saveTasks(tasks, apiKey.token);
    } catch (error: any) {
      console.log(error.message);
      thunkAPI.dispatch(addError('Error sving the tasks to the remote server'));
      return thunkAPI.rejectWithValue(tasks);
    }
  },
);

export const editTask = createAsyncThunk<
  { task: TaskData },
  { task: TaskData },
  { rejectValue: void }
>('tasks/editTask', async ({ task }, thunkAPI) => {
  try {
    const apiKey = (thunkAPI.getState() as RootState).worlds.connected[task.world];

    if (!apiKey) {
      return { task };
    }

    const response = await api.put('timer/tasks/' + task.id, task, apiKey);

    if (!response.ok) {
      console.log(await response.json());
      throw new Error('There was a problem connecting to the server.');
    }

    return { task };
  } catch (error: any) {
    console.log(error.message);
    thunkAPI.dispatch(addError(error.message));
    return thunkAPI.rejectWithValue();
  }
});

export const deleteTask = createAsyncThunk<
  string,
  { id: string; world: string },
  { rejectValue: string }
>('tasks/deleteTask', async ({ id, world }, thunkAPI) => {
  try {
    const apiKey = (thunkAPI.getState() as RootState).worlds.connected[world];

    if (!apiKey) {
      return id;
    }

    const response = await api.delete('timer/tasks/' + id, apiKey);

    if (!response.ok) {
      throw new Error('There was a problem connecting to the server.');
    }

    return id;
  } catch (error: any) {
    const dispatch = thunkAPI.dispatch;
    console.log(error.message);
    dispatch(addError(error.message));
    return thunkAPI.rejectWithValue(id);
  }
});

export const deleteManyTasks = createAsyncThunk<
  { criteria: string | undefined; world: string },
  { world: string; apiKey: string; criteria: string | undefined },
  { rejectValue: { criteria: string | undefined; world: string } }
>('tasks/deleteMany', async ({ world, apiKey, criteria }, thunkAPI) => {
  try {
    let byCritetia = criteria ? '/' + criteria : '';
    const response = await api.delete('timer/tasks/criteria' + byCritetia, apiKey);

    if (!response.ok) {
      console.log(await response.json());
      throw new Error('There was a problem with your request data.');
    }

    console.log(response.status);

    console.log(await response.json());

    return { criteria, world };
  } catch (error: any) {
    console.log(error.message);
    thunkAPI.dispatch(addError(error.message));
    return thunkAPI.rejectWithValue({ criteria, world });
  }
});
