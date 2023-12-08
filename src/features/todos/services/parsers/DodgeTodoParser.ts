import { TodoParser } from './TodoParser';
import { NewTodo } from '../../data/types';
import { AddTodosFormInput } from '../../data/types';
import { convertUTCtoLocalMS } from '../../../../utils/dateTime';

export class DodgeTodoParser extends TodoParser {
  public constructor(input: AddTodosFormInput) {
    super(input);
    this.patterns = [
      {
        name: 'new',
        value:
          /.*?\((\d{3}\|\d{3})\)\sK\d\d.*?\((\d{3}\|\d{3})\)\sK\d\d.*?(today|tomorrow|on\s\d{2}\.\d{2}.*?)\sat\s(\d{2}:\d{2}(?::\d{2}).*?)/g,
      },
    ];
  }

  protected parseFromMatch(match: RegExpMatchArray): NewTodo {
    let [, destination, origin, dateStr, timeStr] = match;

    const dueDateST = this.getDateFromString(dateStr, timeStr);
    const url = this.getUrl(destination);

    const message = `${this.wrapInUrl('Dodge', url)} in ${this.replaceCoords(
      destination,
    )}, attacking village: ${this.replaceCoords(origin)}`;

    const todo = this.generateTodo(convertUTCtoLocalMS(dueDateST), message, url);
    todo.isRepeating = true;

    return todo;
  }

  protected getUrl(coords: string) {
    if (!this.villages[coords]) return undefined;

    const villa = this.villages[coords];

    return `https://${this.input.world}.tribalwars.net/game.php?village=${villa.id}&screen=overview`;
  }
}
