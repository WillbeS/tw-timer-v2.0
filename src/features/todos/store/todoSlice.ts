import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { PendingTasks, TaskData, TasksById } from '../data/types';
import { getTasksFromStorage, saveTasksToStorage } from '../services/todoStorage';

import { getPendingFromStorage, savePendingToStorage } from '../services/pendingStorage';

type TodosState = {
  byId: TasksById;
  pending: PendingTasks;
  loading: boolean;
};

const initialState: TodosState = {
  byId: getTasksFromStorage(),
  pending: getPendingFromStorage(),
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    startLoadingAction: (state) => {
      state.loading = true;
    },
    stoptLoadingAction: (state) => {
      state.loading = false;
    },

    addTodosAction: (state, action: PayloadAction<TaskData[]>) => {
      const todos = action.payload;

      todos.forEach((todo) => {
        state.byId[todo.id] = todo;
      });
    },

    saveAllAction: (state, action: PayloadAction<{ [key: string]: TaskData }>) => {
      state.byId = action.payload;
    },

    editTodoAction: (state, action: PayloadAction<TaskData>) => {
      const todo = action.payload;
      state.byId[todo.id] = { ...todo };
    },

    removeTodoAction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.byId[id];
      saveTasksToStorage(state.byId);
    },

    removeAllAction: (state) => {
      console.log('Should update');
      state.byId = {};
    },

    // pending
    addPendingForSaveAction: (state, action: PayloadAction<string[]>) => {
      const ids = action.payload;

      ids.forEach((id) => {
        state.pending[id] = { id, action: 'save' };
      });

      savePendingToStorage(state.pending);
    },

    addPendingForDeleteAction: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      // already there for save, need to remove it as it's not on the server
      if (state.pending[id]) {
        delete state.pending[id];
      } else {
        state.pending[id] = { id, action: 'delete' };
      }

      savePendingToStorage(state.pending);
    },
  },
});

export const {
  addTodosAction,
  addPendingForSaveAction,
  addPendingForDeleteAction,
  removeTodoAction,
  editTodoAction,
  removeAllAction,
  saveAllAction,
  startLoadingAction,
  stoptLoadingAction,
} = todosSlice.actions;

export const selectFiltered = (state: RootState, world: string = '0', type: string = '0') => {
  let todosArr = Object.values(state.todos.byId);

  if (world !== '0') {
    todosArr = todosArr.filter((t) => t.world === world);
  }

  if (type !== '0') {
    todosArr = todosArr.filter((t) => t.type === type);
  }

  return Object.values(sortByMs(todosArr));
};

export const selectTotalCount = (state: RootState) => {
  return Object.keys(state.todos.byId).length;
};

const sortByMs = (todosArr: TaskData[]) => todosArr.sort((a, b) => a.dueMs - b.dueMs);

export default todosSlice.reducer;
