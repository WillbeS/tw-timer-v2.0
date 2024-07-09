import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskData } from '../data/types';
import { api } from '../../../api';
import { RootState } from '../../../store/store';
import { addError, addSuccess } from '../../messages/store/messageSlice';

import { addTasksAction } from './todoSlice';
import { getApiKeyFromStorage } from '../../security/services/apiKeySorage';

const apiKey = getApiKeyFromStorage();

export const fetchAllTasks = createAsyncThunk<{ tasks: TaskData[] }, string, { rejectValue: null }>(
  'tasks/fetchAll',
  async (token, thunkAPI) => {
    try {
      const tasks = (await api.get('timer/tasks', token)) as TaskData[];

      return { tasks };
    } catch (error: any) {
      const dispatch = thunkAPI.dispatch;
      console.log(error.message);
      dispatch(addError(`Error fetching tasks.`));
      return thunkAPI.rejectWithValue(null);
    }
  },
);

// this is called only when a new connection is created
export const connectTasks = createAsyncThunk<{ tasks: TaskData[] }, string, { rejectValue: void }>(
  'tasks/savePending',
  async (token: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      let pending = Object.values(state.todos.byId).filter((task) => !task.serverId);
      console.log(pending);

      if (pending.length === 0) return { tasks: [] };

      await api.post('timer/tasks', pending, token);
      thunkAPI.dispatch(addSuccess('You data was successfully saved to the server!'));

      return { tasks: pending };
    } catch (error: any) {
      console.log(error.message);
      thunkAPI.dispatch(addError('Error sving the tasks to the remote server'));
      return thunkAPI.rejectWithValue();
    }
  },
);

//temp, will rename to saveTasks
export const saveTodos = createAsyncThunk<void, { tasks: TaskData[] }, { rejectValue: TaskData[] }>(
  'tasks/saveTasks',
  async ({ tasks }, thunkAPI) => {
    try {
      thunkAPI.dispatch(addTasksAction(tasks));

      if (apiKey) {
        await api.post('timer/tasks', tasks, apiKey.token);
      }
    } catch (error: any) {
      console.log(error.message);
      thunkAPI.dispatch(addError('Error sving the tasks to the remote server'));
      return thunkAPI.rejectWithValue(tasks);
    }
  },
);

export const editTask = createAsyncThunk<{ task: TaskData }, TaskData, { rejectValue: void }>(
  'tasks/editTask',
  async (task, thunkAPI) => {
    try {
      if (apiKey) {
        await api.put('timer/tasks/' + task.id, task, apiKey.token);
      }

      return { task };
    } catch (error: any) {
      console.log(error.message);
      thunkAPI.dispatch(addError(error.message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const deleteTask = createAsyncThunk<string, string, { rejectValue: string }>(
  'tasks/deleteTask',
  async (id, thunkAPI) => {
    try {
      if (apiKey) {
        await api.delete('timer/tasks/' + id, apiKey.token);
      }

      return id;
    } catch (error: any) {
      const dispatch = thunkAPI.dispatch;
      console.log(error.message);
      dispatch(addError(error.message));
      return thunkAPI.rejectWithValue(id);
    }
  },
);

export const deleteCompleted = createAsyncThunk('tasks/deleteCompleted', async (_, thunkAPI) => {
  try {
    if (apiKey) {
      await api.delete('timer/tasks/delete/completed', apiKey.token);
    }
  } catch (error: any) {
    console.log(error.message);
    thunkAPI.dispatch(addError(error.message));
    return thunkAPI.rejectWithValue(null);
  }
});

export const deleteAll = createAsyncThunk('tasks/deleteAll', async (_, thunkAPI) => {
  try {
    if (apiKey) {
      await api.delete('timer/tasks', apiKey.token);
    }
  } catch (error: any) {
    console.log(error.message);
    thunkAPI.dispatch(addError(error.message));
    return thunkAPI.rejectWithValue(null);
  }
});
