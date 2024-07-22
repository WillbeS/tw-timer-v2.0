import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../store/store';
import { getSettingsFromStorage } from '../services/settingsStorage';
import { AppSettings } from '../data/types';

const initialState: AppSettings = getSettingsFromStorage();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},

  extraReducers: (builder) => {},
});

export const {} = settingsSlice.actions;

export const settingsSelector = (state: RootState) => state.settings;

export default settingsSlice.reducer;
