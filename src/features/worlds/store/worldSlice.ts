import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getArrFromStorage, getObjFromStorage } from '../../../services/storageManager';

import { WorldData } from '../data/types';
import { fetchWorlds } from './worldAction';
import { RootState } from '../../../store/store';

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
  worlds: getArrFromStorage('tw_worlds'),
  connected: getObjFromStorage('connected_worlds'),
  connectedIds: getObjFromStorage('connected_ids'),
  //needs to be implemented
  selectedWorld: '0',
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
    });
    builder.addCase(fetchWorlds.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      const localWorlds: WorldData[] = getArrFromStorage('tw_worlds');
      state.worlds = localWorlds ? localWorlds : [];

      //to log on backend later
      console.log(action.payload);
    });
  },
});

export const { selectWorld } = worldSlice.actions;

export const worldSelector = (state: RootState) => state.worlds;

export default worldSlice.reducer;
