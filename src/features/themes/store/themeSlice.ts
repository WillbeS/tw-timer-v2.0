import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

import { getSettingsFromStorage } from '../../settings/services/settingsStorage';
import { allThemes } from '../data/constants';
import { ColorTheme } from '../data/ColorTheme';

interface ThemeState {
  theme: ColorTheme;
}

const { colorTheme } = getSettingsFromStorage();

const initialState: ThemeState = {
  theme: allThemes[colorTheme],
};

const themeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    selectTheme: (state, action: PayloadAction<string>) => {
      state.theme = allThemes[action.payload];
    },
  },
});

export const { selectTheme } = themeSlice.actions;

export const themeSelector = (state: RootState) => state.themes;

export default themeSlice.reducer;
