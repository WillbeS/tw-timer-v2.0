import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateKey } from '../api/generateKey';
import { validateKey } from '../api/validateKey';
import { addError, addSuccess } from '../../messages/store/messageSlice';
import { RootState } from '../../../store/store';
import { saveTasks } from '../../todos/api';
import { getTasksFromStorage } from '../../todos/services/todoStorage';
import { TasksById } from '../../todos/data/types';
import { removeKey } from '../../worlds/api/deleteKey';
import { ApiKey } from '../data/types';
import { assignNewIds } from '../../todos/store/todoSlice';

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

    const forSave = Object.values(getTasksFromStorage() as TasksById);

    // for future refactor - decide if it's not better to dispatch an action instead
    if (forSave.length > 0) {
      await saveTasks(forSave, token);
    }

    thunkAPI.dispatch(addSuccess('Successfully connected to the server!'));

    return { token, adminId };
  } catch (error: any) {
    thunkAPI.dispatch(addError(error.message));
    return thunkAPI.rejectWithValue();
  }
});

export const disconnecFromServer = createAsyncThunk(
  'connection/disconnect',
  async (_, thunkAPI) => {
    try {
      const { connection }: RootState = thunkAPI.getState() as RootState;

      const { token, adminId } = connection.apiKey as ApiKey;

      if (adminId) {
        await removeKey(token, adminId);
      }

      thunkAPI.dispatch(assignNewIds());
    } catch (error: any) {
      thunkAPI.dispatch(addError(error.message));
      console.log(error.message);
      return thunkAPI.rejectWithValue(null);
    }
  },
);
