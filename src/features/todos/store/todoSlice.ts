import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { PendingTasks, TaskData, TasksById } from '../data/types';
import { getTasksFromStorage, saveTasksToStorage } from '../services/todoStorage';

import { getPendingFromStorage, savePendingToStorage } from '../services/pendingStorage';
import { fetchTasks } from './taskActions';

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

    mergeConnectedAction: (state, action) => {
      const { serverTasks, connectedWorlds } = action.payload;
      const updated: TasksById = {};

      for (const serverTask of serverTasks) {
        // if it's in the pending array then it's for delete so don't readd it
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

  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<{ world: String; tasks: TaskData[] }>) => {
        state.loading = false;

        const { world, tasks } = action.payload;
        const updated: TasksById = {};

        for (const serverTask of tasks) {
          // if it's in the pending array then it's for delete so don't readd it
          if (state.pending[serverTask.id]) continue;

          updated[serverTask.id] = serverTask;
        }

        for (const id in state.byId) {
          const localTask = state.byId[id];

          //already added from the server
          //or is pending to be saved
          if (localTask.world === world && !state.pending[localTask.id]) continue;

          updated[id] = localTask;
        }
        state.byId = updated;
        saveTasksToStorage(state.byId);
      },
    );
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
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

export const selectTotalCount = (state: RootState) => {
  return Object.keys(state.todos.byId).length;
};

const sortByMs = (todosArr: TaskData[]) => todosArr.sort((a, b) => a.dueMs - b.dueMs);

export default todosSlice.reducer;
