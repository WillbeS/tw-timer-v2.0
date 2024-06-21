import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorldData, assertIsWorldData } from '../data/types';
import { api } from '../../../api';
import { TaskData, TasksById } from '../../todos/data/types';
import { validateKey, generateKey } from '../api/fetchKey';
import { saveData } from '../../../services/storageManager';
import { saveTasks } from '../../todos/api';
import { addError } from '../../messages/store/messageSlice';

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
      console.log(tasks);
      console.log(key);
      await saveTasks(tasks, key);
    }

    return { world, token: key, adminKey };
  } catch (error: any) {
    thunkAPI.dispatch(addError(error.message));
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Helper functions
// but hate it and don't wanna use it if possible
// function assertIsWorldDataArr(worldData: unknown): asserts worldData is WorldData[] {
//   if (!Array.isArray(worldData)) {
//     throw new Error("worldData isn't an array");
//   }
//   if (worldData.length === 0) {
//     return;
//   }

//   worldData.forEach((datum) => {
//     assertIsWorldData(datum);
//   });
// }
