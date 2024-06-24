import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getArrFromStorage, getObjFromStorage } from '../../../services/storageManager';

import { WorldData } from '../data/types';
import { ConnectedWorldData, connectWorld, fetchWorlds, disconnectWorld } from './worldAction';
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
  reducers: {},

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

    // Adding connected world
    builder.addCase(connectWorld.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(connectWorld.fulfilled, (state, action: PayloadAction<ConnectedWorldData>) => {
      const { world, token, adminKey } = action.payload;
      state.loading = false;
      state.connected[world] = token;
      state.connectedIds[world] = adminKey;
      localStorage.setItem('connected_worlds', JSON.stringify(state.connected));
      localStorage.setItem('connected_ids', JSON.stringify(state.connectedIds));
    });
    builder.addCase(connectWorld.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      //to log on backend later
      console.log(action.payload);
    });

    builder.addCase(disconnectWorld.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(disconnectWorld.fulfilled, (state, action: PayloadAction<any>) => {
      const world = action.payload;
      state.loading = false;
      delete state.connected[world];
      delete state.connectedIds[world];
      localStorage.setItem('connected_worlds', JSON.stringify(state.connected));
      localStorage.setItem('connected_ids', JSON.stringify(state.connectedIds));
    });
  },
});

export const {} = worldSlice.actions;

export const worldSelector = (state: RootState) => state.worlds;

export default worldSlice.reducer;
