// Note: all types in VillageData are strings for now because that's how the
// backend is parsing them atm, this may change in the future
export type VillageData = {
  // [key: string]: string;
  bonus: string;
  id: string;
  name: string;
  playerId: string;
  points: string;
  x: string;
  y: string;
};

export type NewTask = {
  type: string;
  world: string;
  message: string;
  dueMs: number;
  alarmOffset: number;
  isRepeating: boolean;
  url?: string | undefined;
  details?: string | undefined;
};

export type TaskData = {
  id: string;
  type: string;
  world: string;
  message: string;
  dueMs: number;
  alarmOffset: number;
  isRepeating: boolean;
  url?: string | undefined;
  details?: string | undefined;
};

// do I use this?
// export type SavedTask = {
//   id: string;
// };

// export type TasksById = {
//   [id: string]: TaskData;
// };

export type AddTasksFormInput = {
  world: string;
  type: string;
  alarmOffset: string;
  text: string;
  subtype: undefined | string;
};

export type AddTasksFormErrors = {
  [key: string]: string | undefined;
  world?: string | undefined;
  type?: string | undefined;
  alarmOffset?: string | undefined;
  text?: string | undefined;
};

export type Transport = {
  wood: number;
  clay: number;
  iron: number;
  dueMs: number;
};
