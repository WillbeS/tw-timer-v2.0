import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllWorlds } from '../../../api';
// import { WorldData } from '../../../data/types';

export const getWorlds = createAsyncThunk('worlds/fetchAll', async () => {
  const response = await fetchAllWorlds();
  localStorage.setItem('tw_worlds', JSON.stringify(response));
  return response;
});

// export const getWorldsWithReject = createAsyncThunk<
//   // Return type of the payload creator
//   WorldData[],
//   // First argument to the payload creator
//   string | undefined,
//   // Types for ThunkAPI
//   {
//     rejectValue: string;
//   }
// >('users/update', async (str, thunkApi) => {
//   try {
//     const response = await fetchAllWorlds();
//     localStorage.setItem('tw_worlds', JSON.stringify(response));
//     return response;
//   } catch (error) {
//     return thunkApi.rejectWithValue('Some error occured');
//   }
// });
