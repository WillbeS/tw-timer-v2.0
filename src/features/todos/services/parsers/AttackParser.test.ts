import { AddTasksFormInput } from '../../data/types';
import { AttackParser } from './AttackParser';
import { times, scripts } from '../../../../data/for-testing/attacks';

const getInput = (alarmOffset: string = '0', text: string = 'no matches', subtype?: string) => {
  return {
    world: 'en142',
    type: 'attack',
    alarmOffset,
    text,
    subtype,
    notes: '',
  };
};

test('should throw an error when text has no matches', async () => {
  const attackParser = new AttackParser(getInput());

  await expect(attackParser.parse()).rejects.toThrow(
    'No matches found! Please check your input and try again.',
  );
});

describe('single village attack sript', () => {
  const attackParser = new AttackParser(getInput('90', scripts.svPlan));

  test('should generate 4 todos', async () => {
    const todos = await attackParser.parse();

    expect(todos.length).toEqual(4);
  });

  test('should calculate the correct launch times', async () => {
    const todos = await attackParser.parse();
    const realMs1 = todos[0].dueMs;
    const expectedMs1 = Date.parse(times.localLaunchTimes[0]);

    expect(realMs1).toEqual(expectedMs1);
  });
});
