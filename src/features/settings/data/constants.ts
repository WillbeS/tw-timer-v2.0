import { TaskTypes } from '../../../data/types';
import { AlarmOffsetSettings } from './types';

export const ALARM_OFFSET_DEFAULT_VALUES: AlarmOffsetSettings = {
  [TaskTypes.Dodge]: '420',
  [TaskTypes.Attack]: '90',
  [TaskTypes.Snipe]: '60',
  // [TaskTypes.Minting]: '30',
  [TaskTypes.Reminder]: '0',
};
