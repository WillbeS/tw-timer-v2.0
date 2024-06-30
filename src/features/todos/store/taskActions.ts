import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskData } from '../data/types';
import { api } from '../../../api';
import { RootState } from '../../../store/store';
import { addError, addSuccess } from '../../messages/store/messageSlice';

import { addTasksAction } from './todoSlice';
import { saveTasks } from '../api';

export const fetchTasks = createAsyncThunk<
  { world: string; tasks: TaskData[] },
  string,
  { rejectValue: null }
>('tasks/fetchTasks', async (world: string, thunkAPI) => {
  try {
    const apiKey = (thunkAPI.getState() as RootState).worlds.connected[world];
    const response = await api.get('timer/tasks', apiKey);

    if (!response.ok) {
      // I'm losing the status code with this, need to check if it's still needed
      const errorMessage =
        response.status === 404 ? "The URL address doesn't exist" : await response.json();
      throw new Error(errorMessage);
    }

    const tasks = (await response.json()) as TaskData[];
    return { world, tasks };
  } catch (error: any) {
    const dispatch = thunkAPI.dispatch;
    console.log(error.message);
    dispatch(addError(`Error fetching tasks for world  ${world}. ` + error.message));
    return thunkAPI.rejectWithValue(null);
  }
});

//temp, will rename to something else
export const saveTodos = createAsyncThunk<
  void,
  { tasks: TaskData[]; world: string },
  { rejectValue: TaskData[] }
>('tasks/saveTasks', async ({ tasks, world }, thunkAPI) => {
  try {
    thunkAPI.dispatch(addTasksAction(tasks));
    const apiKey = (thunkAPI.getState() as RootState).worlds.connected[world];

    if (!apiKey) return;

    await saveTasks(tasks, apiKey);
    thunkAPI.dispatch(addSuccess('Your tasks were successfully saved on the server.'));
  } catch (error: any) {
    console.log(error.message);
    thunkAPI.dispatch(addError('Error sving the tasks to the remote server'));
    return thunkAPI.rejectWithValue(tasks);
  }
});

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
