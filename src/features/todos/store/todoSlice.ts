import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { TaskData, TasksById } from '../data/types';
import { getTodos } from '../services/todoStorage';
import { getObjFromStorage, saveToStorage } from '../../../services/storageManager';

type TodosState = {
  byId: TasksById;
  pendingForDelete: TasksById;
  pendingForSave: TasksById;
  loading: boolean;
};

const initialState: TodosState = {
  byId: getTodos(),
  pendingForDelete: getObjFromStorage('pendingForDelete'),
  pendingForSave: getObjFromStorage('pendingForSave'),
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

    addPendingForSaveAction: (state, action: PayloadAction<TaskData[]>) => {
      const todos = action.payload;

      todos.forEach((todo) => {
        state.pendingForSave[todo.id] = todo;
      });
      saveToStorage('pendingForSave', state.pendingForSave);
    },

    removeAllPendingForSaveAction: (state) => {
      state.pendingForDelete = {};
      saveToStorage('pendingForSave', state.pendingForSave);
    },

    addPendingForDeleteAction: (state, action: PayloadAction<string>) => {
      const todoId = action.payload;

      state.pendingForDelete[todoId] = state.byId[todoId];
      saveToStorage('pendingForDelete', state.pendingForDelete);
    },

    removeAllPendingForDeleteAction: (state) => {
      state.pendingForDelete = {};
      saveToStorage('pendingForDelete', state.pendingForDelete);
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

      if (state.byId[id]) {
        delete state.byId[id];
      }
    },
    removeAllAction: (state) => {
      console.log('Should update');
      state.byId = {};
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
  removeAllPendingForSaveAction,
  removeAllPendingForDeleteAction,
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
