import { generateId } from '../../../utils/stringUtils';
import { getData, saveData } from '../../../services/storageManager';
import { NewTask, TaskData, TasksById } from '../data/types';

const STORAGE_KEY = 'todos';

// Todo - assert that the data is Todos type
export const getTodos = () => getData(STORAGE_KEY);
export const saveTodos = (data: object) => saveData(STORAGE_KEY, data);

export const syncWithApi = (
  remoteTasks: TaskData[],
  connectedWorlds: { [tag: string]: string },
  pendingServerDelete: TasksById,
  pendingForSave: TasksById,
) => {
  const localTasks = getTodos();
  const updated: TasksById = {};

  for (const task of remoteTasks) {
    console.log(task.id);
    console.log(pendingServerDelete);
    if (pendingServerDelete[task.id]) continue;

    updated[task.id] = task;
  }

  for (const id in localTasks) {
    const localTask = localTasks[id];
    // if it's a connected task, don't add it
    // but if it's pending for save it needs to stay
    if (!pendingForSave[localTask.id] && connectedWorlds[localTask.world]) continue;

    updated[id] = localTask;
  }

  saveTodos(updated);

  return updated;
};

// This may become unnecessary, check if it's used on next cleanup!!!
export const saveFromApi = (todos: TaskData[]) => {
  const localTodos = getTodos();
  const forCompare: TaskData[] = Object.values(localTodos);

  for (const todo of todos) {
    if (isDuplicate(todo, forCompare)) continue;

    localTodos[todo.id] = todo;
  }

  saveTodos(localTodos);

  return Object.values(localTodos) as TaskData[];
};

export const saveMany = (todos: NewTask[]): TaskData[] => {
  const saved: TaskData[] = [];

  for (const todo of todos) {
    const id = saveOne(todo);

    if (!id) continue;

    saved.push({ ...todo, id });
  }

  return saved;
};

export const saveOne = (todo: NewTask) => {
  const todos = getTodos();

  if (isDuplicate(todo, Object.values(todos))) return false;

  const id = generateId('todo');

  todos[id] = { ...todo, id };
  saveTodos(todos);

  return id;
};

export const editTodo = (todo: TaskData) => {
  const todos = getTodos();
  todos[todo.id] = todo;
  saveTodos(todos);

  return true;
};

export const deleteTodo = (id: string) => {
  //console.log('Deleteding, ', id);
  const todos = getTodos();
  console.log(todos);
  const deleted = delete todos[id];
  console.log(deleted);
  console.log(todos);

  if (deleted) saveTodos(todos);

  return deleted;
};

export const deleteAll = () => {
  saveTodos({});
};

export const isDuplicate = (newTodo: NewTask, todos: TaskData[]) => {
  let isDuplicate = false;

  for (const todo of todos) {
    if (
      newTodo.message === todo.message &&
      newTodo.type === todo.type &&
      newTodo.dueMs === todo.dueMs &&
      newTodo.world === todo.world
    ) {
      isDuplicate = true;
      break;
    }
  }

  return isDuplicate;
};
