import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { TaskData, TasksById } from '../data/types';
import { getTasksFromStorage, saveTasksToStorage } from '../services/todoStorage';

import {
  deleteAll,
  deleteCompleted,
  deleteTask,
  fetchAllTasks,
  saveTasks,
  toggleCompleted,
} from './taskActions';
import { generateId } from '../../../utils/stringUtils';

type TodosState = {
  loading: boolean;
  byId: TasksById;
  completed: TasksById;
  showActive: boolean;
};

const { byId, completed } = getTasksFromStorage();

const initialState: TodosState = {
  loading: false,
  byId,
  completed,
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

    dynamicUpdateAction: (state, action: PayloadAction<TaskData>) => {
      const todo = action.payload;
      state.byId[todo.id] = { ...todo };
      saveTasksToStorage(state.byId);
    },

    //Add action at the end
    disconnectTasks: (state) => {
      state.byId = changeIds(state.byId);
      state.completed = changeIds(state.completed);
      saveTasksToStorage(state.byId, state.completed);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAllTasks.fulfilled,
      (state, action: PayloadAction<{ tasks: TaskData[] }>) => {
        state.loading = false;
        const { tasks } = action.payload;

        tasks.forEach((t) => {
          if (t.completed) {
            state.completed[t.id] = t;
          } else {
            state.byId[t.id] = t;
          }
        });

        saveTasksToStorage(state.byId, state.completed);
      },
    );
    builder.addCase(fetchAllTasks.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteTask.pending, (state, action) => {
      const id = action.meta.arg;
      delete state.byId[id];
      delete state.completed[id];
      saveTasksToStorage(state.byId, state.completed);
    });

    builder.addCase(saveTasks.pending, (state, action) => {
      const { tasks } = action.meta.arg;

      tasks.forEach((task) => {
        state.byId[task.id] = task;
      });

      saveTasksToStorage(state.byId);
    });

    builder.addCase(toggleCompleted.pending, (state, action) => {
      const task = action.meta.arg;

      if (task.completed) {
        state.completed[task.id] = task;
        delete state.byId[task.id];
      } else {
        state.byId[task.id] = task;
        delete state.completed[task.id];
      }

      saveTasksToStorage(state.byId, state.completed);
    });

    builder.addCase(deleteAll.pending, (state) => {
      state.byId = {};
      state.completed = {};
      saveTasksToStorage(state.byId, state.completed);
    });

    builder.addCase(deleteCompleted.pending, (state) => {
      state.completed = {};
      saveTasksToStorage(null, state.completed);
    });
  },
});

export const {
  dynamicUpdateAction,
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
    console.log('Running the complex task selector');

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

const changeIds = (tasks: TasksById) => {
  const newTasks: TasksById = {};

  Object.values(tasks).forEach((task) => {
    const newId = generateId('task');
    newTasks[newId] = { ...task, id: newId, serverId: undefined };
  });

  return newTasks;
};

export default todosSlice.reducer;
