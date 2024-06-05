import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

const initialState: { errors: string[] } = {
  errors: [],
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
  },
});

export const { addError, clearErrors } = messageSlice.actions;

export const selectErrors = (state: RootState) => {
  return state.messages.errors;
};

export default messageSlice.reducer;
