import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { PendingTasks, TaskData, TasksById } from '../data/types';
import { getTasksFromStorage, saveTasksToStorage } from '../services/todoStorage';

import {
  getPendingFromStorage,
  STORAGE_KEY_PENDING,
  savePendingToStorage,
  savePendingDelToStorage,
  savePendingEditToStorage,
} from '../services/pendingStorage';
import {
  connectTasks,
  deleteAll,
  deleteCompleted,
  deleteTask,
  editTask,
  fetchAllTasks,
  saveTodos,
} from './taskActions';
import { generateId } from '../../../utils/stringUtils';

type TodosState = {
  loading: boolean;
  byId: TasksById;
  pending: PendingTasks;
  showActive: boolean;
  pendingDelete: TasksById;
  pendingEdit: TasksById;
};

const initialState: TodosState = {
  loading: false,
  byId: getTasksFromStorage(), //these are all, the rest can be derived
  pending: getPendingFromStorage(), //delete this when safe
  pendingDelete: getPendingFromStorage(STORAGE_KEY_PENDING.DELETE),
  pendingEdit: getPendingFromStorage(STORAGE_KEY_PENDING.EDIT),
  showActive: true,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // delete when safe
    startLoadingAction: (state) => {
      state.loading = true;
    },
    //delete when safe
    stoptLoadingAction: (state) => {
      state.loading = false;
    },

    showActiveAction: (state, action: PayloadAction<boolean>) => {
      state.showActive = action.payload;
    },

    //does this need to be public???
    addTasksAction: (state, action: PayloadAction<TaskData[]>) => {
      const newTasks = action.payload;

      newTasks.forEach((task) => {
        state.byId[task.id] = task;
      });

      saveTasksToStorage(state.byId);
    },

    dynamicUpdateAction: (state, action: PayloadAction<TaskData>) => {
      const todo = action.payload;
      state.byId[todo.id] = { ...todo };
      saveTasksToStorage(state.byId);
    },

    // this needs to become a thunk
    removeAllAction: (state) => {
      state.byId = {};
      saveTasksToStorage(state.byId);
    },

    //Add action at the end
    disconnectTasks: (state) => {
      const newTasks: TasksById = {};

      Object.values(state.byId).forEach((task) => {
        const newId = generateId('task');
        newTasks[newId] = { ...task, id: newId, serverId: undefined };
      });

      state.byId = newTasks;
      saveTasksToStorage(state.byId);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(deleteTask.pending, (state, action) => {
      const id = action.meta.arg;

      state.pendingDelete[id] = { ...state.byId[id] };
      delete state.byId[id];

      saveTasksToStorage(state.byId);
      savePendingDelToStorage(state.pendingDelete);
    });
    builder.addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
      delete state.pendingDelete[action.payload];
      savePendingDelToStorage(state.pendingDelete);
    });

    builder.addCase(saveTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveTodos.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(saveTodos.rejected, (state, action: PayloadAction<any>) => {
      const tasks = action.payload as TaskData[];

      tasks.forEach((task) => {
        state.pending[task.id] = { id: task.id, action: 'save' };
      });

      savePendingToStorage(state.pending);
    });

    builder.addCase(editTask.pending, (state, action) => {
      const task = action.meta.arg;

      state.pendingEdit[task.id] = task;
      state.byId[task.id] = task;

      saveTasksToStorage(state.byId);
      savePendingEditToStorage(state.pendingEdit);
    });
    builder.addCase(editTask.fulfilled, (state, action: PayloadAction<{ task: TaskData }>) => {
      const { task } = action.payload;
      state.byId[task.id] = task;
      delete state.pendingEdit[task.id];

      saveTasksToStorage(state.byId);
      savePendingEditToStorage(state.pendingEdit);
    });

    builder.addCase(deleteAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAll.fulfilled, (state) => {
      state.loading = false;
      state.byId = {};
      saveTasksToStorage(state.byId);
    });
    builder.addCase(deleteAll.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteCompleted.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCompleted.fulfilled, (state) => {
      state.loading = false;
      const activeTasks: TasksById = {};
      Object.values(state.byId).forEach((task) => {
        if (task.completed) return;

        activeTasks[task.id] = task;
      });

      state.byId = activeTasks;
      saveTasksToStorage(state.byId);
    });
    builder.addCase(deleteCompleted.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchAllTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAllTasks.fulfilled,
      (state, action: PayloadAction<{ tasks: TaskData[] }>) => {
        state.loading = false;
        const { tasks } = action.payload;

        tasks.forEach((t) => {
          state.byId[t.id] = t;
        });

        saveTasksToStorage(state.byId);
      },
    );
    builder.addCase(fetchAllTasks.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(
      connectTasks.fulfilled,
      (state, action: PayloadAction<{ tasks: TaskData[] }>) => {
        const { tasks } = action.payload;

        tasks.forEach((task) => {
          state.byId[task.id] = task;
        });

        saveTasksToStorage(state.byId);
      },
    );
  },
});

export const {
  addTasksAction,
  dynamicUpdateAction,
  removeAllAction,
  startLoadingAction,
  stoptLoadingAction,
  showActiveAction,
  disconnectTasks,
} = todosSlice.actions;

export const taskSelector = (state: RootState) => state.todos.byId;

export const showActiveSelector = (state: RootState) => state.todos.showActive;

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
