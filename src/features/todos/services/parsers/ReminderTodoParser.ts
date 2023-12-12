import { AddTodosFormInput } from '../../data/types';
import { NewTodo } from '../../data/types';
import { TodoParser } from './TodoParser';

export class ReminderTodoParser extends TodoParser {
  public constructor(input: AddTodosFormInput) {
    super(input);
    this.patterns = [
      {
        name: 'hours',
        value: /(?:in|after)\s*(?:(\d{1,3})\s*hour{1}s*)$/g,
      },
      {
        name: 'minutes',
        value: /(?:in|after)\s*(?:(\d{1,3})\s*minute{1}s*)$/g,
      },
      {
        name: 'hours and minutes',
        value: /(?:in|after)\s*(?:(\d{1,3})\s*hour{1}s*).+?(?:(\d{1,4})\s*minute{1}s*)/g,
      },
    ];
  }

  protected parseFromMatch(match: RegExpMatchArray, pattern: string): NewTodo {
    let minutes = 0;

    switch (pattern) {
      case 'hours':
        minutes += Number(match[1]) * 60;
        break;
      case 'minutes':
        minutes += Number(match[1]);
        break;
      default:
        minutes += Number(match[1]) * 60 + Number(match[2]);
        break;
    }

    const dueMs = new Date().getTime() + minutes * 60 * 1000;
    //const message = this.getMessage('' + match.input);
    const message = '' + match.input;

    return this.generateTodo(dueMs, message);
  }

  // May work on this idea later, for now will not implement it
  // or tomorrow may just generate a url from the first coords
  private getMessage = (originalMsg: string) => {
    const pattern = /(\d{3}\|\d{3})/g;
    const coords = originalMsg.match(pattern);

    coords?.forEach((c) => {
      originalMsg = originalMsg.replace(c, this.replaceCoords(c));
    });

    return originalMsg;
  };
}
