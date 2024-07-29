import { TaskTypes } from '../../../data/types';

export type AlarmOffsetSettings = {
  [key in TaskTypes]: string;
};

export type AppSettings = {
  alarmOffset: AlarmOffsetSettings;
  alarmSoundFile: string;
  colorTheme: string;
};
