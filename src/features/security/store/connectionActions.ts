import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateKey } from '../api/generateKey';
import { validateKey } from '../api/validateKey';
import { addError } from '../../messages/store/messageSlice';
import { RootState } from '../../../store/store';

import { api } from '../../../api';
import { TaskData } from '../../todos/data/types';

export const connectToServer = createAsyncThunk<
  { token: string },
  { token: string },
  { rejectValue: void }
>('connection/connect', async ({ token }, thunkAPI) => {
  try {
    if (!token) {
      const keyData = await generateKey();
      token = keyData.token;
    } else {
      token = await validateKey(token);
    }

    // Save current tasks to the server
    const state = thunkAPI.getState() as RootState;

    // Merge active and completed tasks
    const pending = Object.values(state.todos.byId).concat(Object.values(state.todos.completed));

    if (pending.length === 0) return { token };

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

    return { token };
  } catch (error: any) {
    thunkAPI.dispatch(addError(error.message));
    return thunkAPI.rejectWithValue();
  }
});

export const deleteApiKey = createAsyncThunk<{}, { token: string }, { rejectValue: void }>(
  'connection/deleteApiKey',
  async ({ token }, thunkAPI) => {
    try {
      await api.delete('key', `${token}`);
    } catch (error: any) {
      thunkAPI.dispatch(addError(error.message));
      console.log(error.message);
      return thunkAPI.rejectWithValue();
    }
  },
);
