import { createSelector, createSlice, isAction, PayloadAction } from '@reduxjs/toolkit';
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
import { UNSELECTED_TYPE } from '../data/constants';
import { UNSELECTED_WORLD } from '../../worlds/data/constants';

type TodosState = {
  loading: boolean;
  byId: TasksById;
  completed: TasksById;
  showCompleted: boolean;
  selectedType: string;
};

const { byId, completed } = getTasksFromStorage();

const initialState: TodosState = {
  loading: false,
  byId,
  completed,
  showCompleted: false,
  selectedType: UNSELECTED_TYPE,
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

    showCompletedAction: (state, action: PayloadAction<boolean>) => {
      state.showCompleted = action.payload;
    },

    dynamicUpdateAction: (state, action: PayloadAction<TaskData>) => {
      const todo = action.payload;
      state.byId[todo.id] = { ...todo };
      saveTasksToStorage(state.byId);
    },

    disconnectTasks: (state) => {
      state.byId = changeIds(state.byId);
      state.completed = changeIds(state.completed);
      saveTasksToStorage(state.byId, state.completed);
    },

    selectType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
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
        const completed: TasksById = {};
        const byId: TasksById = {};

        tasks.forEach((t) => {
          if (t.completed) {
            completed[t.id] = t;
          } else {
            byId[t.id] = t;
          }
        });

        state.byId = byId;
        state.completed = completed;

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
  showCompletedAction,
  disconnectTasks,
  selectType,
} = todosSlice.actions;

export const todosSelector = (state: RootState) => state.todos;

export const taskSelector = (state: RootState) => state.todos.byId;

export const filteredTasksSelector = createSelector(
  (state: RootState) => state,
  (state) => {
    const tasks = getFilteredTasks(state);

    if (state.todos.showCompleted) {
      return sortByMsDesc(tasks);
    }

    return sortByMs(tasks);
  },
);

export const selectTotalCount = (state: RootState) => {
  return getFilteredTasks(state).length;
};

export default todosSlice.reducer;

//////////////////////////////////////////////////////////////////////////
///helpers
//////////////////////////////////////////////////////////////////////////

const getFilteredTasks = (state: RootState) => {
  let selected = state.todos.showCompleted
    ? Object.values(state.todos.completed)
    : Object.values(state.todos.byId);

  if (state.todos.selectedType !== UNSELECTED_TYPE) {
    selected = selected.filter((t) => t.type === state.todos.selectedType);
  }

  if (state.worlds.selectedWorld !== UNSELECTED_WORLD) {
    selected = selected.filter((t) => t.world === state.worlds.selectedWorld);
  }

  return selected;
};

const sortByMs = (todosArr: TaskData[]) => todosArr.sort((a, b) => a.dueMs - b.dueMs);

const sortByMsDesc = (todosArr: TaskData[]) => todosArr.sort((a, b) => b.dueMs - a.dueMs);

const changeIds = (tasks: TasksById) => {
  const newTasks: TasksById = {};

  Object.values(tasks).forEach((task) => {
    const newId = generateId('task');
    newTasks[newId] = { ...task, id: newId, serverId: undefined };
  });

  return newTasks;
};
