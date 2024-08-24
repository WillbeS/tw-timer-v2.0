import { SUPPORTED_THEMES } from '../../settings/data/constants';

import { brown } from './brown';
import { tw } from './tw';
// import { twGradient } from './twGradient';

import { dark } from './dark';

export const allThemes = {
  [SUPPORTED_THEMES.BROWN]: brown,
  [SUPPORTED_THEMES.DARK]: dark,
  [SUPPORTED_THEMES.TW]: tw,
  // [SUPPORTED_THEMES.TW_GRADIENT]: twGradient,
};
