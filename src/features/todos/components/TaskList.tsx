import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, editTask } from '../api';

import { RootState } from '../../../store/store';
import {
  removeTodoAction,
  selectFiltered,
  editTodoAction,
  addTodosAction,
  startLoadingAction,
  stoptLoadingAction,
} from '../store/todoSlice';
import { deleteTodo, editTodo, saveFromApi } from '../services/todoStorage';
import { TaskData } from '../data/types';
import { formatTime } from '../../../utils/dateTime';

import { TaskRow } from './TaskRow';
import { TopBar } from './TopBar';

export const TaskList = () => {
  const [world, setWorld] = useState('0');
  const [type, setType] = useState('0');

  const todos = useSelector((state: RootState) => selectFiltered(state, world, type));
  const loading = useSelector((state: RootState) => state.todos.loading);
  const dispatch = useDispatch();
  const nextDeadline = todos.length > 0 ? todos[0].dueMs : null;
  const nextTodoType = todos.length > 0 ? todos[0].type : null;

  useEffect(() => {
    if (nextDeadline) {
      const interval = setInterval(() => {
        document.title = `${formatTime(nextDeadline - new Date().getTime())} - ${nextTodoType}`;
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nextDeadline, nextTodoType]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        dispatch(startLoadingAction());

        if (deleteTodo(id)) {
          dispatch(removeTodoAction(id));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(stoptLoadingAction());
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
          await editTask(todo);
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
    try {
      console.log('Sync from API');
      dispatch(startLoadingAction());
      const serverTasks: TaskData[] = await fetchTasks();
      const saved = saveFromApi(serverTasks);
      dispatch(addTodosAction(saved));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stoptLoadingAction());
    }
  }, [dispatch]);

  console.log('Todo list is rendering');
  return (
    <>
      <TopBar
        onWorldChange={(newWorld) => setWorld(newWorld)}
        onTypeChange={(newType) => setType(newType)}
        onSync={handleSync}
      />
      <div className="flex flex-col gap-2 text-sm md:text-lg font-semibold mt-5">
        {loading && <div className="text-white text-center">Loading...</div>}
        {todos.map((todo) => (
          <TaskRow key={todo.id} todo={todo} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </>
  );
};
