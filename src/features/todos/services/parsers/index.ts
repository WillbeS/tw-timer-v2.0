import { TodoParser } from './TodoParser';
import { ReminderParser } from './ReminderParser';
import { DodgeParser } from './DodgeParser';
import { todoTypes } from '../../data/constants';
import { AddTasksFormInput } from '../../data/types';
import { AttackParser } from './AttackParser';
import { SnipeParser } from './SnipeParser';
import { MintingParser } from './MintingParser';

export interface Parser {
  [key: string]: any;
}

// Add all new parsers here
export const parsers: Parser = {
  [todoTypes.REMINDER]: ReminderParser,
  [todoTypes.DODGE]: DodgeParser,
  [todoTypes.ATTACK]: AttackParser,
  [todoTypes.SNIPE]: SnipeParser,
  [todoTypes.MINTING]: MintingParser,
};

const getParser = (input: AddTasksFormInput): TodoParser => {
  if (!parsers[input.type]) {
    // trow new custom error when I make it :)
    // or return the parent Parser? Need to decide
  }

  const Parser = parsers[input.type];
  return new Parser(input);
};

export { getParser, TodoParser };
