import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../store/store';
import { getSettingsFromStorage, saveSettingsToStorage } from '../services/settingsStorage';
import { AlarmOffsetSettings, AppSettings } from '../data/types';

const { alarmOffset, alarmSoundFile, colorTheme } = getSettingsFromStorage();

const initialState: AppSettings = {
  alarmOffset,
  alarmSoundFile,
  colorTheme,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<AppSettings>) => {
      const { alarmOffset, alarmSoundFile, colorTheme } = action.payload;
      state.alarmOffset = alarmOffset;
      state.alarmSoundFile = alarmSoundFile;
      state.colorTheme = colorTheme;

      saveSettingsToStorage(action.payload);
    },

    updateAlarmOffsetSettings: (state, action: PayloadAction<AlarmOffsetSettings>) => {
      state.alarmOffset = action.payload;

      saveSettingsToStorage(state);
    },

    updateAlarmSoundSettings: (state, action: PayloadAction<string>) => {
      state.alarmSoundFile = action.payload;

      saveSettingsToStorage(state);
    },

    updateColorThemeSettings: (state, action: PayloadAction<string>) => {
      state.colorTheme = action.payload;

      saveSettingsToStorage(state);
    },
  },
});

export const { updateAlarmOffsetSettings, updateAlarmSoundSettings, updateColorThemeSettings } =
  settingsSlice.actions;

export const settingsSelector = (state: RootState) => state.settings;

export default settingsSlice.reducer;
