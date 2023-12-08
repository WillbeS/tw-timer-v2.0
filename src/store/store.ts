import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/store/todoSlice';
import alarmReducer from '../features/alarm/store/alarmSlice';

export const store = configureStore({
  reducer: { todos: todosReducer, alarm: alarmReducer },
});

export type RootState = ReturnType<typeof store.getState>;
