import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MessageTypes } from '../../../data/types';

type MessagesInitState = {
  [key in MessageTypes]: string[];
};

const initialState: MessagesInitState = {
  error: [],
  info: [],
  success: [],
  warning: [],
};

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addSuccess: (state, action) => {
      state.success.push(action.payload);
    },

    addInfo: (state, action) => {
      state.info.push(action.payload);
    },

    addWarning: (state, action) => {
      state.warning.push(action.payload);
    },

    addError: (state, action) => {
      state.error.push(action.payload);
    },

    // this is actuallly not very convinient
    addMessage: (state, action: PayloadAction<{ message: string; type: MessageTypes }>) => {
      const { message, type } = action.payload;
      state[type].push(message);
    },

    clearMessages: (state, action: PayloadAction<MessageTypes>) => {
      const type = action.payload;
      state[type] = [];
    },
  },
});

export const { addMessage, addSuccess, addWarning, addError, addInfo, clearMessages } =
  messageSlice.actions;

export default messageSlice.reducer;
