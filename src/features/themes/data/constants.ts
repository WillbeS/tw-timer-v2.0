import { SUPPORTED_THEMES } from '../../settings/data/constants';
import { blue } from './blue';
import { brown } from './brown';
import { slate } from './slate';

export const allThemes = {
  [SUPPORTED_THEMES.BROWN]: brown,
  [SUPPORTED_THEMES.BLUE]: blue,
  [SUPPORTED_THEMES.SLATE]: slate,
};
