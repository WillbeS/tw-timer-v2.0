import { SUPPORTED_THEMES } from '../../settings/data/constants';
import { blue } from './blue';
import { brown } from './brown';
import { tw } from './tw';
import { dark } from './dark';

export const allThemes = {
  [SUPPORTED_THEMES.BROWN]: brown,
  [SUPPORTED_THEMES.DARK]: dark,
  [SUPPORTED_THEMES.BLUE]: blue,
  [SUPPORTED_THEMES.TW]: tw,
};
