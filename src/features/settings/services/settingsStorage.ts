import { getObjFromStorage, saveToStorage } from '../../../services/storageManager';
import { ALARM_OFFSET_DEFAULT_VALUES } from '../data/constants';
import { AppSettings } from '../data/types';

const STORAKE_KEY_SETTINGS = 'settings';

const defaultSettings: AppSettings = {
  alarmOffset: ALARM_OFFSET_DEFAULT_VALUES,
};

export const getSettingsFromStorage = (): AppSettings => {
  const storageSettings: AppSettings = getObjFromStorage(STORAKE_KEY_SETTINGS);

  if (Object.keys(storageSettings).length > 0) {
    return storageSettings;
  }

  return defaultSettings;
};

export const saveSettingsToStorage = (settings: object) => {
  saveToStorage(STORAKE_KEY_SETTINGS, settings);
};
