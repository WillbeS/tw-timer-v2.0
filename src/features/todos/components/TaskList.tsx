import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, editTask, deleteTask } from '../api';

import { RootState } from '../../../store/store';
import {
  removeTodoAction,
  selectFiltered,
  editTodoAction,
  // addTodosAction,
  saveAllAction,
  startLoadingAction,
  stoptLoadingAction,
  addPendingForDeleteAction,
} from '../store/todoSlice';
import { deleteTodo, editTodo, saveFromApi, syncWithApi } from '../services/todoStorage';
import { TaskData } from '../data/types';
import { formatTime } from '../../../utils/dateTime';

import { TaskRow } from './TaskRow';
import { TopBar } from './TopBar';
import { getWorldKey } from '../../../utils/api';

export const TaskList = () => {
  const [world, setWorld] = useState('0');
  const [type, setType] = useState('0');

  const todos = useSelector((state: RootState) => selectFiltered(state, world, type));
  const pendingForDelete = useSelector((state: RootState) => state.todos.pendingForDelete);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const dispatch = useDispatch();
  const nextDeadline = todos.length > 0 ? todos[0].dueMs : null;
  const nextTodoType = todos.length > 0 ? todos[0].type : null;
  const connectedWorlds = useSelector((state: RootState) => state.worlds.connected);
  const connectedWorldsCount = Object.keys(connectedWorlds).length;

  useEffect(() => {
    if (nextDeadline) {
      const interval = setInterval(() => {
        document.title = `${formatTime(nextDeadline - new Date().getTime())} - ${nextTodoType}`;
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nextDeadline, nextTodoType]);

  const loadingMessage = `Loading from server. Connected worlds: ${connectedWorldsCount}`;

  const handleDelete = useCallback(
    async (id: string, world: string) => {
      const apiKey = getWorldKey(world);

      if (apiKey) {
        dispatch(startLoadingAction());
        const isDeleted = await deleteTask(id, apiKey);

        if (!isDeleted) {
          dispatch(addPendingForDeleteAction(id));
        }

        dispatch(stoptLoadingAction());
      }

      // procede from deleting from the oficial storage
      if (deleteTodo(id)) {
        dispatch(removeTodoAction(id));
      }
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    async (todo: TaskData) => {
      try {
        dispatch(startLoadingAction());

        if (editTodo(todo)) {
          dispatch(editTodoAction(todo));
          //await editTask(todo); //this needs to be removed and changed from the server side (shouldn't be deleted on load unless there are no more transports)
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(stoptLoadingAction());
      }
    },
    [dispatch],
  );

  const handleSync = useCallback(async () => {
    if (connectedWorldsCount === 0) {
      dispatch(startLoadingAction());
      setTimeout(() => {
        dispatch(stoptLoadingAction());
      }, 2000);

      return;
    }

    try {
      dispatch(startLoadingAction());

      const serverTasks: TaskData[] = [];
      for (const cw in connectedWorlds) {
        const fetched = await fetchTasks(connectedWorlds[cw]);
        serverTasks.push(...fetched);
      }

      //const serverTasks: TaskData[] = await fetchTasks();
      const saved = syncWithApi(serverTasks, connectedWorlds, pendingForDelete);

      dispatch(saveAllAction(saved));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stoptLoadingAction());
    }
  }, [dispatch]);

  // console.log('Todo list is rendering');
  return (
    <>
      <TopBar
        onWorldChange={(newWorld) => setWorld(newWorld)}
        onTypeChange={(newType) => setType(newType)}
        onSync={handleSync}
      />
      <div className="flex flex-col gap-2 text-sm md:text-lg font-semibold mt-5">
        {loading && <div className="text-white text-center">{loadingMessage}</div>}
        {todos.map((todo) => (
          <TaskRow key={todo.id} todo={todo} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </>
  );
};
