import { TodoParser } from './TodoParser';
import { ReminderTodoParser } from './ReminderTodoParser';
import { DodgeTodoParser } from './DodgeTodoParser';
import { todoTypes } from '../../data/constants';
import { AddTodosFormInput } from '../../data/types';
import { AttackTodoParser } from './AttackTodoParser';
import { SnipeTodoParser } from './SnipeTodoParser';
import { MintingTodoParser } from './MintingTodoParser';

export interface Parser {
  [key: string]: any;
}

// Add all new parsers here
export const parsers: Parser = {
  [todoTypes.REMINDER]: ReminderTodoParser,
  [todoTypes.DODGE]: DodgeTodoParser,
  [todoTypes.ATTACK]: AttackTodoParser,
  [todoTypes.SNIPE]: SnipeTodoParser,
  [todoTypes.MINTING]: MintingTodoParser,
};

const getParser = (input: AddTodosFormInput): TodoParser => {
  if (!parsers[input.type]) {
    // trow new custom error when I make it :)
    // or return the parent Parser? Need to decide
  }

  const Parser = parsers[input.type];
  return new Parser(input);
};

export { getParser, TodoParser, ReminderTodoParser };
