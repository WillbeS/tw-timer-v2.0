import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskData } from '../data/types';
import { api } from '../../../api';
import { RootState } from '../../../store/store';
import { addError } from '../../messages/store/messageSlice';

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

export const deleteTask = createAsyncThunk<
  string,
  { id: string; world: string },
  { rejectValue: string }
>('tasks/deleteTasks', async ({ id, world }, thunkAPI) => {
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
