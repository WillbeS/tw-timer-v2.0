import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todosReducer from '../features/todos/store/todoSlice';
import alarmReducer from '../features/alarm/store/alarmSlice';
import worldReducer from '../features/worlds/store/worldSlice';
import messageReducer from '../features/messages/store/messageSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    alarm: alarmReducer,
    worlds: worldReducer,
    messages: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
