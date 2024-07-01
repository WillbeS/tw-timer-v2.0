import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiKey } from '../data/types';
import { getApiKeyFromStorage, saveApiKeyToStorage } from '../services/apiKeySorage';
import { RootState } from '../../../store/store';
import { connectToServer } from './connectionActions';

interface ConnectionState {
  loading: boolean;
  online: boolean;
  apiKey: ApiKey | undefined;
}

const initialState: ConnectionState = {
  loading: false,
  online: false,
  apiKey: getApiKeyFromStorage(),
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(connectToServer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      connectToServer.fulfilled,
      (state, action: PayloadAction<{ token: string; adminId: string | undefined }>) => {
        state.loading = false;
        const { token, adminId } = action.payload;
        state.apiKey = { token, adminId };
        saveApiKeyToStorage(state.apiKey);
      },
    );
    builder.addCase(connectToServer.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  //todo, add actions
} = connectionSlice.actions;

export const connectionSelector = (state: RootState) => state.connection;

export default connectionSlice.reducer;
