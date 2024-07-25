import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../store/store';
import { getSettingsFromStorage, saveSettingsToStorage } from '../services/settingsStorage';
import { AppSettings } from '../data/types';

const initialState: AppSettings = getSettingsFromStorage();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<AppSettings>) => {
      const { alarmOffset } = action.payload;
      state.alarmOffset = alarmOffset;
      saveSettingsToStorage(action.payload);
    },
  },
});

export const { updateSettings } = settingsSlice.actions;

export const settingsSelector = (state: RootState) => state.settings;

export default settingsSlice.reducer;
