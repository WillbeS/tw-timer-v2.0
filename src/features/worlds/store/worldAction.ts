import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWorlds } from '../api/fetchWorlds';
import { saveToStorage, getArrFromStorage } from '../../../services/storageManager';
import { WorldData } from '../data/types';

export const getWorlds = createAsyncThunk('worlds/fetchAll', async () => {
  let worlds = await fetchWorlds();

  if (!worlds) {
    const localWorlds: WorldData[] = getArrFromStorage('tw_worlds');

    return localWorlds ? localWorlds : [];
  }

  saveToStorage('tw_worlds', worlds);

  return worlds;
});
