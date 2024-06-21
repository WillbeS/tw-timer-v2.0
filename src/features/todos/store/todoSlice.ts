import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

    addTasksAction: (state, action: PayloadAction<TaskData[]>) => {
      const newTasks = action.payload;

      newTasks.forEach((task) => {
        state.byId[task.id] = task;
      });

      saveTasksToStorage(state.byId);
    },

    // delete when safe!
    // addTodosAction: (state, action: PayloadAction<TaskData[]>) => {
    //   const todos = action.payload;

    //   todos.forEach((todo) => {
    //     state.byId[todo.id] = todo;
    //   });
    // },

    mergeConnectedAction: (state, action) => {
      const { serverTasks, connectedWorlds } = action.payload;
      const updated: TasksById = {};

      for (const serverTask of serverTasks) {
        if (state.pending[serverTask.id]) continue;

        updated[serverTask.id] = serverTask;
      }

      for (const id in state.byId) {
        const localTask = state.byId[id];
        // if it's a connected task, don't add it
        // but if it's pending for save it needs to stay
        if (!state.pending[localTask.id] && connectedWorlds[localTask.world]) continue;

        updated[id] = localTask;
      }

      state.byId = updated;
      saveTasksToStorage(state.byId);
    },

    dynamicUpdateAction: (state, action: PayloadAction<TaskData>) => {
      const todo = action.payload;
      state.byId[todo.id] = { ...todo };
      saveTasksToStorage(state.byId);
    },

    removeTodoAction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.byId[id];
      saveTasksToStorage(state.byId);
    },

    removeAllAction: (state) => {
      state.byId = {};
      saveTasksToStorage(state.byId);
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
  // addTodosAction,
  addTasksAction,
  addPendingForSaveAction,
  addPendingForDeleteAction,
  removeTodoAction,
  dynamicUpdateAction,
  removeAllAction,
  mergeConnectedAction,
  startLoadingAction,
  stoptLoadingAction,
} = todosSlice.actions;

export const taskSelector = (state: RootState) => state.todos.byId;

export const filteredTasksSelector = createSelector(
  [
    // First input selector extracts items from the state
    taskSelector,
    // Second input selector forwards the world argument
    (state: RootState, world: string) => world,
    // Third input selector forwards the type argument
    (state: RootState, world: string, type: string) => type,
  ],
  (tasks, world, type) => {
    let todosArr = Object.values(tasks);

    if (world !== '0') {
      todosArr = todosArr.filter((t) => t.world === world);
    }

    if (type !== '0') {
      todosArr = todosArr.filter((t) => t.type === type);
    }

    return Object.values(sortByMs(todosArr));
  },
);

// export const selectFiltered = (state: RootState, world: string = '0', type: string = '0') => {
//   let todosArr = Object.values(state.todos.byId);

//   if (world !== '0') {
//     todosArr = todosArr.filter((t) => t.world === world);
//   }

//   if (type !== '0') {
//     todosArr = todosArr.filter((t) => t.type === type);
//   }

//   return Object.values(sortByMs(todosArr));
// };

export const selectTotalCount = (state: RootState) => {
  return Object.keys(state.todos.byId).length;
};

const sortByMs = (todosArr: TaskData[]) => todosArr.sort((a, b) => a.dueMs - b.dueMs);

export default todosSlice.reducer;
