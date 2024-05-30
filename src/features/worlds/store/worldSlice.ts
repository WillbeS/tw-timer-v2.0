import { createSlice } from '@reduxjs/toolkit';
import {
  getWorlds,
  //  getWorldsWithReject
} from './worldAction';

import { WorldData } from '../../../data/types';

// initialize userToken from local storage
// doing it like this because otherwise TypeScript throws an error
const localWorlds = localStorage.getItem('tw_worlds');
const worlds = localWorlds ? JSON.parse(localWorlds) : [];

const localConnected = localStorage.getItem('connected_worlds');
const connected = localConnected ? JSON.parse(localConnected) : {};

//rename to all and connected
type WorldState = {
  worlds: WorldData[];
  connected: {
    [tag: string]: string;
  };
};

const initialState: WorldState = {
  worlds,
  connected,
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
    // builder.addCase(getWorldsWithReject.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   state.worlds = action.payload;
    // });
    // builder.addCase(getWorldsWithReject.rejected, (state, action) => {
    //   console.log(action.payload);
    // });
  },
});

export const { addConnectedWorld, removeConnectedWorld } = worldSlice.actions;

export default worldSlice.reducer;
