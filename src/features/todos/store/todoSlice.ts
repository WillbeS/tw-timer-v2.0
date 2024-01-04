import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
//import { TasksById, TaskData } from '../data/types';
import { TaskData } from '../data/types';
import { getTodos } from '../services/todoStorage';

type State = {
  byId: {
    [id: string]: TaskData;
  };
  loading: boolean;
};

const initialState: State = {
  byId: getTodos(),
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodosAction: (state) => {
      state.loading = true;
    },
    addedTodosAction: (state, action: PayloadAction<TaskData[]>) => {
      const todos = action.payload;

      todos.forEach((todo) => {
        state.byId[todo.id] = todo;
      });
      state.loading = false;
    },

    // Don't need it right now but if I move the data to the server will do
    editTodoAction: (state) => {
      state.loading = true;
    },

    editedTodoAction: (state, action: PayloadAction<TaskData>) => {
      const todo = action.payload;
      state.byId[todo.id] = { ...todo };
      state.loading = false;
    },

    // Don't need it right now but if I move the data to the server will do
    removeTodoAction: (state) => {
      state.loading = true;
    },

    removedTodoAction: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (state.byId[id]) {
        delete state.byId[id];
      }

      state.loading = false;
    },
  },
});

export const {
  addTodosAction,
  addedTodosAction,
  removeTodoAction,
  removedTodoAction,
  editTodoAction,
  editedTodoAction,
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

const sortByMs = (todosArr: TaskData[]) => todosArr.sort((a, b) => a.dueMs - b.dueMs);

export default todosSlice.reducer;
