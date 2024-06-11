import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../api';

import { RootState } from '../../../store/store';
import {
  removeTodoAction,
  selectFiltered,
  dynamicUpdateAction,
  startLoadingAction,
  stoptLoadingAction,
  addPendingForDeleteAction,
  mergeConnectedAction,
} from '../store/todoSlice';

import { TaskData } from '../data/types';
import { formatTime } from '../../../utils/dateTime';

import { TaskRow } from './TaskRow';
import { TopBar } from './TopBar';
import { addError } from '../../messages/store/messageSlice';
import { getKeyFromStorage } from '../../worlds/services/apiKeySorage';

export const TaskList = () => {
  const [world, setWorld] = useState('0');
  const [type, setType] = useState('0');

  const todos = useSelector((state: RootState) => selectFiltered(state, world, type));
  const { loading } = useSelector((state: RootState) => state.todos);
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
      dispatch(removeTodoAction(id));
      const apiKey = getKeyFromStorage(world);

      if (apiKey) {
        try {
          await deleteTask(id, apiKey);
        } catch (error) {
          dispatch(addPendingForDeleteAction(id));
          console.log(error);
        }
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
      // instead of this will show a message

      return;
    }

    try {
      dispatch(startLoadingAction());

      const serverTasks: TaskData[] = [];
      for (const cw in connectedWorlds) {
        const fetched = await fetchTasks(connectedWorlds[cw]);
        serverTasks.push(...fetched);
      }

      dispatch(mergeConnectedAction({ serverTasks, connectedWorlds }));
    } catch (error) {
      console.log(error);
      dispatch(addError('Problem connecting to the server, please try again alater'));
    } finally {
      dispatch(stoptLoadingAction());
    }
  }, [dispatch, connectedWorldsCount, connectedWorlds]);

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
          <TaskRow
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onDynamicUpdate={(updated) => dispatch(dynamicUpdateAction(updated))}
          />
        ))}
      </div>
    </>
  );
};
