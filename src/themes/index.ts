import { ColorTheme } from './ColorTheme';
import { getSettingsFromStorage } from '../features/settings/services/settingsStorage';
import { SUPPORTED_THEMES } from '../features/settings/data/constants';

import { brown } from './/brown';
import { blue } from './blue';
import { slate } from './slate';

export const allThemes = {
  [SUPPORTED_THEMES.BROWN]: brown,
  [SUPPORTED_THEMES.BLUE]: blue,
  [SUPPORTED_THEMES.SLATE]: slate,
};

// Everything below this part may prove useless!!!
/////////////////////////////////////////////////////////

// Use this to set the theme on settings change
export const setColorTheme = (newTheme: string) => {
  console.log('setting new color theme: ', newTheme);
  defaultTheme = allThemes[newTheme];
};

// Load the default theme
const { colorTheme } = getSettingsFromStorage();
let defaultTheme = allThemes[colorTheme];

export const theme: ColorTheme = defaultTheme;
