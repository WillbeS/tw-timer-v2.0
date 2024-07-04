import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateKey } from '../api/generateKey';
import { validateKey } from '../api/validateKey';
import { addError, addSuccess } from '../../messages/store/messageSlice';
import { RootState } from '../../../store/store';

import { ApiKey } from '../data/types';
import { disconnectTasks } from '../../todos/store/todoSlice';
import { connectTasks } from '../../todos/store/taskActions';
import { api } from '../../../api';

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

    thunkAPI.dispatch(connectTasks(token));

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
        await api.removeNew('key', `${token}${adminId}`);
      }

      thunkAPI.dispatch(disconnectTasks());
    } catch (error: any) {
      thunkAPI.dispatch(addError(error.message));
      console.log(error.message);
      return thunkAPI.rejectWithValue(null);
    }
  },
);
