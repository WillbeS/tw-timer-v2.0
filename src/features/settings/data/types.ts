import { TaskTypes } from '../../../data/types';

export type AlarmOffsetSettings = {
  [key in TaskTypes]: string;
};

export interface AppSettings {
  alarmOffset: AlarmOffsetSettings;
}
