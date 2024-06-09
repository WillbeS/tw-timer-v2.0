import { generateId } from '../../../utils/stringUtils';
import {
  getData,
  saveData,
  getObjFromStorage,
  saveToStorage,
} from '../../../services/storageManager';
import { NewTask, TaskData, TasksById } from '../data/types';

const STORAGE_KEY = 'todos';
////////////////// NEW WAY TO DO THINGS //////////////////
export const getTasksFromStorage = () => getObjFromStorage(STORAGE_KEY);

export const saveTasksToStorage = (tasks: TasksById) => {
  saveToStorage(STORAGE_KEY, tasks);
};
//////////////////////////////////////////////////////////

/////////////// OLD WAY TO DO THINGS /////////////////////
// Todo - assert that the data is Todos type
export const getTodos = () => getData(STORAGE_KEY);
export const saveTodos = (data: object) => saveData(STORAGE_KEY, data);

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

//for del
// export const editTodo = (todo: TaskData) => {
//   const todos = getTodos();
//   todos[todo.id] = todo;
//   saveTodos(todos);

//   return true;
// };

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
