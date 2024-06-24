import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskData } from '../data/types';
import { api } from '../../../api';
import { RootState } from '../../../store/store';
import { addError } from '../../messages/store/messageSlice';

// temp name
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
      const errorMessage = await response.json();
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
