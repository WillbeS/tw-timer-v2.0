import { TodoParser } from './TodoParser';
import { NewTodo, AddTodosFormInput } from '../../data/types';
import { snipeTypes } from '../../data/constants';
import { convertUTCtoLocalMS } from '../../../../utils/dateTime';

type MatchParts = {
  unit: string;
  origin: string;
  destination: string;
  dueDateST: Date;
  url: string | undefined;
};

export class SnipeTodoParser extends TodoParser {
  public constructor(input: AddTodosFormInput) {
    super(input);
    this.patterns = [
      {
        name: snipeTypes.SV_SNIPE_RA,
        value:
          /\[unit\](.+?)\[\/unit\].*?(\d\d\d\|\d\d\d)\s\[\|\](\d{1,2}\/\d{1,2}\/\d{4})\s(\d\d:\d\d:\d\d).+?url=(.+?x=(\d{3})&y=(\d{3}))/g,
      },
      {
        name: snipeTypes.MASS_SNIPE_RA,
        value:
          /\[unit\](.+?)\[\/unit\].*?(\d\d\d\|\d\d\d)\s\[\|\]\s(\d{3}\|\d{3}).+?(\d\d\/\d\d\/\d{4})\s(\d\d:\d\d:\d\d).+?(\d\d\/\d\d\/\d{4})\s(\d\d:\d\d:\d\d).+?url=(.+?x=\d{3}&y=\d{3})/g,
      },
    ];
  }

  protected parseFromMatch(match: RegExpMatchArray, pattern: string): NewTodo {
    let parts: MatchParts;
    switch (pattern) {
      case snipeTypes.MASS_SNIPE_RA:
        parts = this.parseMassSnipeRA(match);
        break;
      case snipeTypes.SV_SNIPE_RA:
      default:
        parts = this.parseSVSnipeRA(match);
        break;
    }

    const { unit, origin, destination, dueDateST, url } = parts;

    const message = `${this.wrapInUrl('Send', url)} ${unit} support from ${this.replaceCoords(
      origin,
    )} to ${this.replaceCoords(destination)}`;

    return this.generateTodo(convertUTCtoLocalMS(dueDateST), message, url);
  }

  private parseMassSnipeRA(match: RegExpMatchArray): MatchParts {
    // empty ones are full match and landing date and time
    let [, unit, origin, destination, , , dateStr, timeStr, url] = match;
    unit = this.getUnitFromBBCode(unit);
    const dueDateST = this.getDateFromString(dateStr, timeStr);

    return { unit, origin, destination, dueDateST, url };
  }

  private parseSVSnipeRA(match: RegExpMatchArray): MatchParts {
    let [, unit, origin, dateStr, timeStr, url, x, y] = match;
    unit = this.getUnitFromBBCode(unit);
    const destination = `${x}|${y}`;
    const dueDateST = this.getDateFromString(dateStr, timeStr);

    return { unit, origin, destination, dueDateST, url };
  }

  protected getUrl(origin: string, destination: string) {
    if (!this.villages[origin] || !this.villages[destination]) return undefined;

    const originId = this.villages[origin].id;
    const x = this.villages[destination].x;
    const y = this.villages[destination].y;

    // example url
    // https://en131.tribalwars.net/game.php?village=57016&screen=place&x=606&y=703

    return `https://${this.input.world}.tribalwars.net/game.php?village=${originId}&screen=place&x=${x}&y=${y}`;
  }

  // Supported formats:
  // 16/06/2023 08:40:20
  protected getDateFromString(dateStr: string, timeStr: string): Date {
    const [day, month, year] = dateStr.split('/');

    return new Date(`${year}-${month}-${day} ${timeStr}`);
  }
}
