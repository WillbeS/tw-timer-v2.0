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
    let message = '' + match.input;

    if (!this.input.world) {
      return this.generateTodo(dueMs, message);
    }

    const coords = message.match(/(\d{3}\|\d{3})/g);

    if (!coords) {
      return this.generateTodo(dueMs, message);
    }

    console.log(coords[0]);

    const url = this.getUrl(coords[0]);
    message = message.replace(coords[0], this.wrapInUrl(coords[0], url));

    return this.generateTodo(dueMs, message, url);
  }

  protected getUrl(coords: string) {
    if (!this.villages[coords]) return undefined;

    const id = this.villages[coords].id;
    const x = this.villages[coords].x;
    const y = this.villages[coords].y;

    // example url
    //https://en137.tribalwars.net/game.php?screen=info_village&id=40754#696;504

    return `https://${this.input.world}.tribalwars.net/game.php?screen=info_village&id=${id}#${x};${y}`;
  }
}
