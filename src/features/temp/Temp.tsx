import { useEffect, useState } from 'react';
import { Todo } from '../todos/data/types';

import { fetchWorlds, fetchVillages, saveTasks, editTask, fetchTasks, deleteTask } from './api';
import { generateId } from '../../utils/stringUtils';

export const Temp = () => {
  const [world, setWorld] = useState('Loading');
  const [villages, setVillages] = useState('Loading');
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [saveT, setSaveT] = useState('Loading');
  const [editT, setEditT] = useState('waiting for user');
  const [deleteT, setDeleteT] = useState('waiting for user');

  const todo = {
    id: '',
    type: 'reminder',
    world: '-1',
    message: `test in ${Math.floor(Math.random() * 100)} hours`,
    dueMs: 1702237402392,
    alarmOffset: 0,
    isRepeating: false,
  };

  useEffect(() => {
    fetchWorlds().then((r) => {
      console.log(r);
      setWorld('Done!');
    });

    fetchVillages('en136', '540|562,539|562').then((r) => {
      console.log(r);
      setVillages('Done!');
    });

    fetchTasks().then((r) => {
      console.log(r);
      setTasks(r);
    });
  }, []);

  const handleTaskFetch = async () => {
    const tasks = await fetchTasks();
    setTasks(tasks);
  };

  const handleTasksSave = async () => {
    todo.id = generateId('todo');
    const result = await saveTasks([todo]);
    console.log(result);
    setSaveT('Done!');
    handleTaskFetch();
  };

  const handleTaskEdit = async (id: string) => {
    todo.id = id;
    todo.message = 'Edideted ' + todo.message;
    const result = await editTask(todo);
    console.log(result);
    setEditT('Done!');
    handleTaskFetch();
  };

  const handleTaskDelete = async (id: string) => {
    const result = await deleteTask(id);
    console.log(result);
    setDeleteT('Done!');
    handleTaskFetch();
  };

  return (
    <div className="w-2/3 mx-auto mt-6 bg-stone-200 p-5 text-center">
      <p className="mt-6">Testing worlds: {world}</p>
      <p className="mt-6">Testing villages: {villages}</p>
      <p className="mt-6">Testing edit tasks: {editT}</p>
      <p className="mt-6">Testing delete tasks: {deleteT}</p>

      <p className="mt-6">Testing tasks:</p>
      {tasks.map((task) => (
        <p key={task.id}>
          {task.message} -{' '}
          <span
            role="button"
            className="text-underline pointer-cursor text-yellow-700 mr-1"
            onClick={() => handleTaskEdit(task.id)}
          >
            [Edit]
          </span>
          <span
            role="button"
            className="text-underline pointer-cursor text-yellow-700"
            onClick={() => handleTaskDelete(task.id)}
          >
            [Del]
          </span>
        </p>
      ))}

      <p className="mt-6">Testing save tasks: {saveT}</p>
      <button className="rounded bg-yellow-700 text-white px-3 py-1" onClick={handleTasksSave}>
        Save Tasks
      </button>
    </div>
  );
};
