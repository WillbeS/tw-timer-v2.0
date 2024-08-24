import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateKey } from '../api/generateKey';
import { validateKey } from '../api/validateKey';
import { addError, addSuccess } from '../../messages/store/messageSlice';
import { RootState } from '../../../store/store';

import { ApiKey } from '../data/types';
import { api } from '../../../api';
import { TaskData } from '../../todos/data/types';

export const connectToServer = createAsyncThunk<
  { token: string; adminId: string | undefined },
  { token: string },
  { rejectValue: void }
>('connection/connect', async ({ token }, thunkAPI) => {
  try {
    let adminId;

    if (!token) {
      const keyData = await generateKey();
      adminId = keyData.adminId;
      token = keyData.token;
    } else {
      token = await validateKey(token);
    }

    // Save current tasks to the server
    const state = thunkAPI.getState() as RootState;

    // Merge active and completed tasks
    const pending = Object.values(state.todos.byId).concat(Object.values(state.todos.completed));

    if (pending.length === 0) return { token, adminId };

    // If there are any, sort them by world and save them separately
    const byWorld: {
      [worldKey: string]: TaskData[];
    } = {};

    pending.forEach((task) => {
      if (!byWorld[task.world]) {
        byWorld[task.world] = [];
      }

      byWorld[task.world].push(task);
    });

    for (const world in byWorld) {
      await api.post(`timer/tasks/${world}`, byWorld[world], token);
    }

    // thunkAPI.dispatch(addSuccess('Successfully connected to the server!'));

    return { token, adminId };
  } catch (error: any) {
    thunkAPI.dispatch(addError(error.message));
    return thunkAPI.rejectWithValue();
  }
});

// The admin id will no longer be used, will deltel it entirely later
export const deleteApiKey = createAsyncThunk<{}, { token: string }, { rejectValue: void }>(
  'connection/deleteApiKey',
  async ({ token }, thunkAPI) => {
    try {
      await api.delete('key', `${token}`);

      // thunkAPI.dispatch(disconnectTasks());
      // thunkAPI.dispatch(addSuccess('Your api key was successfully deleted.'));
    } catch (error: any) {
      thunkAPI.dispatch(addError(error.message));
      console.log(error.message);
      return thunkAPI.rejectWithValue();
    }
  },
);
