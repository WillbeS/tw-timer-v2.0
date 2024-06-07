import { createSlice } from '@reduxjs/toolkit';
import { getWorlds } from './worldAction';
import { getArrFromStorage, getObjFromStorage } from '../../../services/storageManager';

import { WorldData } from '../data/types';

//rename to all and connected
type WorldState = {
  worlds: WorldData[];
  connected: {
    [tag: string]: string;
  };
};

const initialState: WorldState = {
  worlds: getArrFromStorage('tw_worlds'),
  connected: getObjFromStorage('connected_worlds'),
};

const worldSlice = createSlice({
  name: 'worlds',
  initialState,
  reducers: {
    addConnectedWorld: (state, action) => {
      const { worldTag, key } = action.payload;

      state.connected = { ...state.connected, [worldTag]: key };
      localStorage.setItem('connected_worlds', JSON.stringify(state.connected));
    },
    removeConnectedWorld: (state, action) => {
      const worldTag = action.payload;

      if (state.connected[worldTag]) {
        delete state.connected[worldTag];
        localStorage.setItem('connected_worlds', JSON.stringify(state.connected));
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getWorlds.fulfilled, (state, action) => {
      state.worlds = action.payload;
    });
  },
});

export const { addConnectedWorld, removeConnectedWorld } = worldSlice.actions;

export default worldSlice.reducer;
