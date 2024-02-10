import { createSlice } from '@reduxjs/toolkit';
import {
  getWorlds,
  //  getWorldsWithReject
} from './worldAction';

import { WorldData } from '../../../data/types';

// initialize userToken from local storage
const localWorlds = localStorage.getItem('tw_worlds');
const worlds = localWorlds ? JSON.parse(localWorlds) : [];

type WorldState = {
  worlds: WorldData[];
};

const initialState: WorldState = {
  worlds,
};

const worldSlice = createSlice({
  name: 'worlds',
  initialState,
  reducers: {},
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

export default worldSlice.reducer;
