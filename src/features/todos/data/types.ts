export type NewTodo = {
  type: string;
  world: string;
  message: string;
  dueMs: number;
  alarmOffset: number;
  isRepeating: boolean;
  url?: string | undefined;
  details?: string | undefined;
};

export type Todo = {
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

export type SavedTodo = {
  id: string;
};

export type TodosById = {
  [id: string]: Todo;
};

export type AddTodosFormInput = {
  world: string;
  type: string;
  alarmOffset: string;
  text: string;
};

export type AddTodosFormErrors = {
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
