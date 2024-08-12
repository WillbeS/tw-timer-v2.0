import { TaskTypes } from '../../../data/types';
import { AlarmOffsetSettings } from './types';

// export const THEMES = {
//   BLUE: 'Blue',
//   TW: 'TW',
//   SLATE: 'Slate',
// };

export const ALARM_OFFSET_DEFAULT_VALUES: AlarmOffsetSettings = {
  [TaskTypes.Dodge]: '420',
  [TaskTypes.Attack]: '90',
  [TaskTypes.Snipe]: '60',
  // [TaskTypes.Minting]: '30',
  [TaskTypes.Reminder]: '0',
};

export const ALARM_SOUNDS: { [key: string]: string } = {
  Beep: 'beep.wav',
  'Soft Beep': 'soft-beep.mp3',
  Piano: 'piano.mp3',
};

export const ALARM_SOUND_DEFAULT = ALARM_SOUNDS.Beep;

export const SUPPORTED_THEMES = {
  BROWN: 'brown',
  // DARK: 'dark',
  // TW: 'tw',
};

export const COLOR_THEME_DEFAULT = SUPPORTED_THEMES.BROWN;
