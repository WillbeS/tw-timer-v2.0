import { createSelector, createSlice, isAction, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { PendingTasks, TaskData, TasksById } from '../data/types';
import { getTasksFromStorage, saveTasksToStorage } from '../services/todoStorage';

import { getPendingFromStorage, savePendingToStorage } from '../services/pendingStorage';
import { deleteManyTasks, deleteTask, editTask, fetchTasks, saveTodos } from './taskActions';
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

    // this seems very wrong but is the easiest thing to do
    replaceWorldTasks: (state, action: PayloadAction<string>) => {
      const world = action.payload;

      Object.values(state.byId).forEach((task) => {
        if (task.world !== world) {
          return;
        }

        const newId = generateId('task');
        state.byId[newId] = { ...task, id: newId };
        delete state.byId[task.id];
      });

      saveTasksToStorage(state.byId);
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
        const { tasks } = action.payload;

        for (const serverTask of tasks) {
          // if it's in the pending array then it's for delete so don't readd it
          if (state.pending[serverTask.id]) continue;

          state.byId[serverTask.id] = serverTask;
        }

        saveTasksToStorage(state.byId);
      },
    );
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
      console.log('Fetching tasks rejected');
    });

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

    // this whole shit is temp, until I remove the worlds from connected
    builder.addCase(deleteManyTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteManyTasks.fulfilled,
      (state, action: PayloadAction<{ criteria: string | undefined; world: string }>) => {
        state.loading = false;
        const { criteria, world } = action.payload;
        const { remainingTasks } = deleteTasks(state.byId, criteria, world);
        state.byId = remainingTasks;
      },
    );
    builder.addCase(deleteManyTasks.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      const { criteria, world } = action.payload;
      const { remainingTasks, tasksForDelete } = deleteTasks(state.byId, criteria, world);

      state.byId = remainingTasks;
      Object.values(tasksForDelete).forEach(
        (t) => (state.pending[t.id] = { id: t.id, action: 'delete' }),
      );
    });
  },
});

export const {
  addTasksAction,
  dynamicUpdateAction,
  removeAllAction,
  startLoadingAction,
  stoptLoadingAction,
  replaceWorldTasks,
  showActiveAction,
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
