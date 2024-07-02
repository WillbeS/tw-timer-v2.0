import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorldData } from '../data/types';
import { api } from '../../../api';
import { TaskData } from '../../todos/data/types';
import { validateKey } from '../api/validateKey';
import { saveTasks } from '../../todos/api';
import { addError, addSuccess } from '../../messages/store/messageSlice';
import { removeKey } from '../api/deleteKey';
import { RootState } from '../../../store/store';
import { generateKey } from '../api/generateKey';
// import { replaceWorldTasks } from '../../todos/store/todoSlice';

export const fetchWorlds = createAsyncThunk<WorldData[], void, { rejectValue: string }>(
  'worlds/fetchWorlds',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('worlds');
      if (!response.ok) {
        throw new Error('There was a problem on the server, status code: ' + response.status);
      }
      const data = (await response.json()) as WorldData[];

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export interface ConnectedWorldData {
  world: string;
  token: string;
  adminKey: string | null;
}

export const connectWorld = createAsyncThunk<
  ConnectedWorldData,
  { key: string; world: string; tasks: TaskData[] },
  { rejectValue: string }
>('worlds/connectWorld', async ({ key, world, tasks }, thunkAPI) => {
  try {
    let adminKey = null;

    if (!key) {
      const keyData = await generateKey(world);
      adminKey = keyData.adminId;
      key = keyData.token;
    } else {
      key = await validateKey(world, key);
    }

    if (tasks.length > 0) {
      await saveTasks(tasks, key);
      thunkAPI.dispatch(addSuccess('Your tasks were successfully saved on the server.'));
    }

    return { world, token: key, adminKey };
  } catch (error: any) {
    thunkAPI.dispatch(addError(error.message));
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const disconnectWorld = createAsyncThunk(
  'worlds/removeConnectedWorldAdmin',
  async (world: string, thunkAPI) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;
      const token = state.worlds.connected[world];
      const adminId = state.worlds.connectedIds[world];

      if (adminId) {
        await removeKey(token, adminId);
      }

      //thunkAPI.dispatch(replaceWorldTasks(world));

      return world;
    } catch (error: any) {
      thunkAPI.dispatch(addError(error.message));
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
