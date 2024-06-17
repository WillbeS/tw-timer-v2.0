import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

const initialState: { errors: string[]; info: string[] } = {
  errors: [],
  info: [],
};

export const messageSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    addError: (state, action) => {
      state.errors.push(action.payload);
    },
    clearErrors: (state) => {
      state.errors = [];
    },
    addInfo: (state, action) => {
      state.info.push(action.payload);
    },
    clearInfo: (state) => {
      state.info = [];
    },
  },
});

export const { addError, clearErrors, addInfo, clearInfo } = messageSlice.actions;

export const selectErrors = (state: RootState) => {
  return state.messages.errors;
};

export const selectInfoMessages = (state: RootState) => {
  return state.messages.info;
};

export default messageSlice.reducer;
