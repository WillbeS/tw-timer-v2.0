import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { PendingTasks, TaskData, TasksById } from '../data/types';
import { getTasksFromStorage, saveTasksToStorage } from '../services/todoStorage';

import { getPendingFromStorage, savePendingToStorage } from '../services/pendingStorage';
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
};

const initialState: TodosState = {
  loading: false,
  byId: getTasksFromStorage(), //these are all, the rest can be derived
  pending: getPendingFromStorage(), //this can be done better, with ids from the server
  showActive: true,
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
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      const id = action.payload;
      delete state.byId[id];
      saveTasksToStorage(state.byId);

      if (state.pending[id] && state.pending[id].action === 'save') {
        delete state.pending[id];
        savePendingToStorage(state.pending);
      }
    });
    builder.addCase(deleteTask.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      const id = action.payload;
      console.log(id);
      console.log('Promise rejected!');

      // First, add to penging for delete
      // but if it's already there for save, need to remove it as it's not on the server
      if (state.pending[id] && state.pending[id].action === 'save') {
        delete state.pending[id];
      } else {
        state.pending[id] = { id, action: 'delete' };
      }

      // Then delete if from state and update the storage
      delete state.byId[action.payload];
      saveTasksToStorage(state.byId);
      savePendingToStorage(state.pending);
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

    builder.addCase(editTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editTask.fulfilled, (state, action: PayloadAction<{ task: TaskData }>) => {
      state.loading = false;
      const { task } = action.payload;
      state.byId[task.id] = task;
      saveTasksToStorage(state.byId);
    });
    builder.addCase(editTask.rejected, (state) => {
      state.loading = false;
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

const getByWorld = (tasks: TaskData[], world: string) => tasks.filter((t) => t.world === world);

const getByCompleted = (tasks: TaskData[], completed: boolean) =>
  tasks.filter((t) => t.completed === completed);

const deleteTasks = (allTasks: TasksById, criteria: string | undefined, world: string) => {
  let tasksForDelete = getByWorld(Object.values(allTasks), world);
  const remainingTasks = { ...allTasks };

  if (criteria) {
    const completed = criteria === 'completed';
    tasksForDelete = getByCompleted(tasksForDelete, completed);
  }

  tasksForDelete.forEach((task) => delete remainingTasks[task.id]);

  saveTasksToStorage(remainingTasks);

  return {
    remainingTasks,
    tasksForDelete,
  };
};

export default todosSlice.reducer;
