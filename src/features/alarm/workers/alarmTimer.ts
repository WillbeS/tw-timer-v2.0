/* eslint-disable no-restricted-globals */
import { Todo } from '../../todos/data/types';

let allTimes: { id: string; dueMs: number }[] = [];
const todosById: { [id: string]: Todo } = {};

// This should run only once for the entire app
console.log('Setting up an interval');
setInterval(() => {
  for (const todo of allTimes) {
    if (Math.round((new Date().getTime() - todo.dueMs) / 1000) === 0) {
      self.postMessage(todosById[todo.id]);
      break;
    }
  }
}, 1000);

self.onmessage = (e: MessageEvent<Todo[]>) => {
  const todos: Todo[] = e.data;

  if (todos.length > 0) {
    allTimes = todos.map((todo) => {
      todosById[todo.id] = todo;
      return { id: todo.id, dueMs: todo.dueMs - todo.alarmOffset * 1000 };
    });
  }
};

export {};
