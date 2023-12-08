import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

const initialState = {
  isOn: false,
};

// Looks like I won't need this after all but will keep it for now
export const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    toggleAlarm: (state) => {
      state.isOn = !state.isOn;
    },
  },
});

export const { toggleAlarm } = alarmSlice.actions;

export const selectIsOn = (state: RootState) => state.alarm.isOn;

export default alarmSlice.reducer;
