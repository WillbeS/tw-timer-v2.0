import { generateId } from '../../../utils/stringUtils';
import { getData, saveData } from '../../../services/storageManager';
import { NewTodo, Todo } from '../data/types';

const STORAGE_KEY = 'todos';

// Todo - assert that the data is Todos type
export const getTodos = () => getData(STORAGE_KEY);
export const saveTodos = (data: object) => saveData(STORAGE_KEY, data);

export const saveFromApi = (todos: Todo[]) => {
  const localTodos = getTodos();
  const forCompare: Todo[] = Object.values(localTodos);

  for (const todo of todos) {
    if (isDuplicate(todo, forCompare)) continue;

    localTodos[todo.id] = todo;
  }

  saveTodos(localTodos);

  return Object.values(localTodos) as Todo[];
};

export const saveMany = (todos: NewTodo[]): Todo[] => {
  const saved: Todo[] = [];

  for (const todo of todos) {
    const id = saveOne(todo);

    if (!id) continue;

    saved.push({ ...todo, id });
  }

  return saved;
};

export const saveOne = (todo: NewTodo) => {
  const todos = getTodos();

  if (isDuplicate(todo, Object.values(todos))) return false;

  const id = generateId('todo');

  todos[id] = { ...todo, id };
  saveTodos(todos);

  return id;
};

export const editTodo = (todo: Todo) => {
  const todos = getTodos();
  todos[todo.id] = todo;
  saveTodos(todos);

  return true;
};

export const deleteTodo = (id: string) => {
  console.log('Deleteding, ', id);
  const todos = getTodos();
  console.log(todos);
  const deleted = delete todos[id];
  console.log(deleted);
  console.log(todos);

  if (deleted) saveTodos(todos);

  return deleted;
};

export const isDuplicate = (newTodo: NewTodo, todos: Todo[]) => {
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
