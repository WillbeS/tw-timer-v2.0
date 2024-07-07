import { useState, useCallback, useEffect } from 'react';

import { RootState } from '../../../store/store';
import { dynamicUpdateAction, filteredTasksSelector } from '../store/todoSlice';

import { formatTime } from '../../../utils/dateTime';

import { TaskRow } from './TaskRow';
import { TopBar } from './TopBar';
import { deleteTask } from '../store/taskActions';
import { useAppDispatch } from '../../../store/hooks';
import { useAppSelector } from '../../../store/hooks';

export const TaskList = () => {
  const [world, setWorld] = useState('0');
  const [type, setType] = useState('0');

  const dispatch = useAppDispatch();

  const todos = useAppSelector((state: RootState) => filteredTasksSelector(state, world, type));

  const { loading, showActive } = useAppSelector((state: RootState) => state.todos);
  const displayTodos = showActive
    ? todos.filter((t) => !t.completed)
    : todos.filter((t) => t.completed);

  const nextDeadline = todos.length > 0 ? todos[0].dueMs : null;
  const nextTodoType = todos.length > 0 ? todos[0].type : null;

  const connectedWorlds = useAppSelector((state: RootState) => state.worlds.connected);
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
      dispatch(deleteTask({ id, world }));
    },
    [dispatch],
  );

  //console.log('Todo list is rendering');
  return (
    <>
      <TopBar
        onWorldChange={(newWorld) => setWorld(newWorld)}
        onTypeChange={(newType) => setType(newType)}
      />
      <div className="flex flex-col gap-2 text-sm md:text-lg font-semibold mt-5">
        {loading && <div className="text-white text-center">{loadingMessage}</div>}
        {displayTodos.map((todo) => (
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
