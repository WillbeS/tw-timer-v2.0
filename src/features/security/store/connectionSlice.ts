import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiKey } from '../data/types';
import {
  getApiKeyFromStorage,
  removeApiKeyFromStorage,
  saveApiKeyToStorage,
} from '../services/apiKeySorage';
import { RootState } from '../../../store/store';
import { connectToServer, deleteApiKey } from './connectionActions';

interface ConnectionState {
  loading: boolean;
  apiKey: ApiKey | undefined;
}

const initialState: ConnectionState = {
  loading: false,
  apiKey: getApiKeyFromStorage(),
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    disconnectFromServer: (state) => {
      state.apiKey = undefined;
      removeApiKeyFromStorage();
    },
  },

  extraReducers: (builder) => {
    builder.addCase(connectToServer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      connectToServer.fulfilled,
      (state, action: PayloadAction<{ token: string }>) => {
        state.loading = false;
        const { token } = action.payload;
        state.apiKey = { token };
        saveApiKeyToStorage(state.apiKey);
      },
    );
    builder.addCase(connectToServer.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteApiKey.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteApiKey.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteApiKey.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { disconnectFromServer } = connectionSlice.actions;

export const connectionSelector = (state: RootState) => state.connection;

export default connectionSlice.reducer;
