import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorldData } from '../data/types';
import { api } from '../../../api';

export const fetchWorlds = createAsyncThunk<WorldData[], void, { rejectValue: string }>(
  'worlds/fetchWorlds',
  async (_, thunkAPI) => {
    try {
      const data = (await api.get('worlds')) as WorldData[];

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
