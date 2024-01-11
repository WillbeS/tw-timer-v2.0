import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask, editTask } from '../api';

import { RootState } from '../../../store/store';
import {
  removeTodoAction,
  removedTodoAction,
  selectFiltered,
  editTodoAction,
  editedTodoAction,
  addTodosAction,
  addedTodosAction,
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
      dispatch(removeTodoAction());

      if (deleteTodo(id)) {
        dispatch(removedTodoAction(id));
        //await deleteTask(id);
        // TODO - handle error
      }
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    async (todo: TaskData) => {
      dispatch(editTodoAction());

      if (editTodo(todo)) {
        dispatch(editedTodoAction(todo));
        await editTask(todo);
        // TODO - error handling
      }
    },
    [dispatch],
  );

  const handleSync = useCallback(async () => {
    console.log('Sync from API');
    dispatch(addTodosAction()); // sets loading to true

    const serverTasks: TaskData[] = await fetchTasks();

    const saved = saveFromApi(serverTasks);
    dispatch(addedTodosAction(saved));
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
