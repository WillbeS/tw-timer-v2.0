import { TaskData } from '../data/types';
import { TodoView } from './TodoView';
import { MintingTodoView } from './MintingTodoView';
import { DodgeTodoView } from './DodgeTodoView';
import { todoTypes } from '../data/constants';

export interface View {
  [key: string]: any;
}

// Add all new views here
export const todoViews: View = {
  general: TodoView,
  // [todoTypes.MINTING]: MintingTodoView,
  [todoTypes.DODGE]: DodgeTodoView,
};

export function getTodoView(todo: TaskData): TodoView {
  if (!todoViews[todo.type]) {
    const View = todoViews.general;
    return new View(todo);
  }

  const View = todoViews[todo.type];
  return new View(todo);
}
