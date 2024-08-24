import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getArrFromStorage,
  getObjFromStorage,
  saveToStorage,
} from '../../../services/storageManager';

import { WorldData } from '../data/types';
import { fetchWorlds } from './worldAction';
import { RootState } from '../../../store/store';
import { UNSELECTED_WORLD, STORAGE_KEY_WORLDS } from '../data/constants';

interface WorldState {
  worlds: WorldData[];
  connected: {
    [tag: string]: string;
  };
  connectedIds: {
    [tag: string]: string | null;
  };
  selectedWorld: string;
  loading: boolean;
}

const initialState: WorldState = {
  worlds: getArrFromStorage(STORAGE_KEY_WORLDS),
  connected: getObjFromStorage('connected_worlds'), //delete when safe
  connectedIds: getObjFromStorage('connected_ids'), //delete when safe
  selectedWorld: UNSELECTED_WORLD,
  loading: false,
};

const worldSlice = createSlice({
  name: 'worlds',
  initialState,
  reducers: {
    selectWorld: (state, action: PayloadAction<string>) => {
      state.selectedWorld = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Fetching worlds
    builder.addCase(fetchWorlds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWorlds.fulfilled, (state, action: PayloadAction<WorldData[]>) => {
      state.loading = false;
      state.worlds = action.payload;
      saveToStorage(STORAGE_KEY_WORLDS, state.worlds);
    });
    builder.addCase(fetchWorlds.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      const localWorlds: WorldData[] = getArrFromStorage(STORAGE_KEY_WORLDS);
      state.worlds = localWorlds ? localWorlds : [];

      //to log on backend later
      console.log(action.payload);
    });
  },
});

export const { selectWorld } = worldSlice.actions;

export const worldSelector = (state: RootState) => state.worlds;

export default worldSlice.reducer;
