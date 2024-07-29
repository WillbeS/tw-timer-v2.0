import { getObjFromStorage, saveToStorage } from '../../../services/storageManager';
import {
  ALARM_OFFSET_DEFAULT_VALUES,
  ALARM_SOUND_DEFAULT,
  COLOR_THEME_DEFAULT,
} from '../data/constants';
import { AppSettings } from '../data/types';

const STORAKE_KEY_SETTTNGS = 'settings';

const defaultSettings: AppSettings = {
  alarmOffset: ALARM_OFFSET_DEFAULT_VALUES,
  alarmSoundFile: ALARM_SOUND_DEFAULT,
  colorTheme: COLOR_THEME_DEFAULT,
};

export const getSettingsFromStorage = (): AppSettings => {
  let storageSettings: AppSettings = getObjFromStorage(STORAKE_KEY_SETTTNGS);

  if (Object.keys(storageSettings).length < Object.keys(defaultSettings).length) {
    storageSettings = defaultSettings;
  }

  return storageSettings;
};

export const saveSettingsToStorage = (settings: object) => {
  saveToStorage(STORAKE_KEY_SETTTNGS, settings);
};
