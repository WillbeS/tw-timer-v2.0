import { configureStore } from '@reduxjs/toolkit';

import todosReducer from '../features/todos/store/todoSlice';
import alarmReducer from '../features/alarm/store/alarmSlice';
import worldReducer from '../features/worlds/store/worldSlice';
import messageReducer from '../features/messages/store/messageSlice';
import connectionSlice from '../features/security/store/connectionSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    alarm: alarmReducer,
    worlds: worldReducer,
    messages: messageReducer,
    connection: connectionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
