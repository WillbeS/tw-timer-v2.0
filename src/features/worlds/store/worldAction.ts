import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorldData, assertIsWorldData } from '../data/types';
import { api } from '../../../api';

export const fetchWorlds = createAsyncThunk<WorldData[], void, { rejectValue: string }>(
  'worlds/fetchWorlds',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('worlds');
      if (!response.ok) {
        throw new Error('There was a problem on the server, status code: ' + response.status);
      }

      const body = (await response.json()) as unknown;
      assertIsWorldDataArr(body);

      return body;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue('Failed to fetch worlds');
    }
  },
);

function assertIsWorldDataArr(worldData: unknown): asserts worldData is WorldData[] {
  if (!Array.isArray(worldData)) {
    throw new Error("worldData isn't an array");
  }
  if (worldData.length === 0) {
    return;
  }

  worldData.forEach((datum) => {
    assertIsWorldData(datum);
  });
}
