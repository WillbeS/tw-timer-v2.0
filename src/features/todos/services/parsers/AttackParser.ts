import { TodoParser } from './TodoParser';
import { NewTask, AddTasksFormInput } from '../../data/types';
import { attackTypes, attackSubtypes } from '../../data/constants';
import { convertUTCtoLocalMS } from '../../../../utils/dateTime';

type MatchParts = {
  unit: string;
  origin: string;
  destination: string;
  dueDateST: Date;
  url: string | undefined;
};

export class AttackParser extends TodoParser {
  public constructor(input: AddTasksFormInput) {
    super(input);
    this.patterns = [
      {
        name: attackTypes.SV_ATTACK_RA,
        value:
          /\[unit\](.+?)\[\/unit\]\s+(\d\d\d\|\d\d\d).+?(\d{1,2}\/\d{1,2}\/\d{4})\s(\d{1,2}:\d{1,2}:\d{1,2}).*?\[url=(.+?)\]Send\[\/url\]/g,
      },
      {
        name: attackTypes.MASS_ATTACK_RA,
        value:
          /(\[unit\].+?\[\/unit\]).*?(\d\d\d\|\d\d\d).*?(\d\d\d\|\d\d\d).*?(\d{1,2}\/\d{1,2}\/\d{4}).*?(\d\d:\d\d:\d\d)/g,
      },
      {
        name: attackTypes.MASS_ATTACK_DEVIL,
        value:
          /.*?\[unit\](.*?)\[\/unit\].*?(\d{4}-\d\d-\d\d).*?(\d\d:\d\d:\d\d).*?(\d\d\d\|\d\d\d).*?(\d\d\d\|\d\d\d)/g,
      },
      {
        name: attackTypes.MASS_ATTACK_FODOX,
        value:
          /.*?(\d{3}\|\d{3}).*?(\d{3}\|\d{3}).*?\[unit\](.*?)\[\/unit\].*?\[b\](\d\d-\d\d-\d{4})\s(\d\d:\d\d:\d\d)/g,
      },
    ];
  }

  protected parseFromMatch(match: RegExpMatchArray, pattern: string): NewTask {
    let parts: MatchParts;
    switch (pattern) {
      case attackTypes.MASS_ATTACK_FODOX:
        parts = this.parseMassAttackFodox(match);
        break;
      case attackTypes.MASS_ATTACK_DEVIL:
        parts = this.parseMassAttackDevil(match);
        break;
      case attackTypes.MASS_ATTACK_RA:
        parts = this.parseMassAttackRA(match);
        break;
      case attackTypes.SV_ATTACK_RA:
      default:
        parts = this.parseSVAttackRA(match);
        break;
    }

    const { unit, origin, destination, dueDateST, url } = parts;

    // const attack =
    //   this.input.subtype === attackSubtypes.FANG ? 'fang' : `${this.input.subtype} ${unit} attack`;

    const message = `${this.wrapInUrl('Send', url)} ${this.input.subtype} from ${this.replaceCoords(
      origin,
    )} to ${this.replaceCoords(destination)}`;

    return this.generateTodo(convertUTCtoLocalMS(dueDateST), message, url);
  }

  private parseSVAttackRA(match: RegExpMatchArray): MatchParts {
    let [, unit, origin, dateStr, timeStr, url] = match;
    unit = this.getUnitFromBBCode(unit);

    const [, , xStr, yStr] = url.split('&');
    const destination = `${xStr.replace('x=', '')}|${yStr.replace('y=', '')}`;

    const dueDateST = this.getDateFromString(dateStr, timeStr);

    return { unit, origin, destination, dueDateST, url };
  }

  private parseMassAttackRA(match: RegExpMatchArray): MatchParts {
    let [, unit, origin, destination, dateStr, timeStr] = match;
    unit = this.getUnitFromBBCode(unit);

    console.log(dateStr);
    const dueDateST = this.getDateFromString(dateStr, timeStr);

    return { unit, origin, destination, dueDateST, url: this.getUrl(origin, destination) };
  }

  private parseMassAttackDevil(match: RegExpMatchArray): MatchParts {
    let [, unit, dateStr, timeStr, origin, destination] = match;
    unit = this.getUnitFromBBCode(unit);
    const dueDateST = new Date(`${dateStr} ${timeStr}`);

    return { unit, origin, destination, dueDateST, url: this.getUrl(origin, destination) };
  }

  private parseMassAttackFodox(match: RegExpMatchArray): MatchParts {
    let [, origin, destination, unit, dateStr, timeStr] = match;
    dateStr = dateStr.replaceAll('-', '/');
    unit = this.getUnitFromBBCode(unit);
    const dueDateST = this.getDateFromString(dateStr, timeStr);

    return { unit, origin, destination, dueDateST, url: this.getUrl(origin, destination) };
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
