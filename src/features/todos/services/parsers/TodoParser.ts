import { NewTask } from '../../data/types';
import { AddTasksFormInput } from '../../data/types';
import { getVillages } from '../../api';
import { VillageData } from '../../../../data/types';
import { getRelativeDate } from '../../../../utils/dateTime';

type Pattern = {
  name: string;
  value: RegExp;
};

export type Matches = {
  pattern: string;
  value: RegExpMatchArray[];
};

type VillagesByCoords = {
  [key: string]: VillageData;
};

export abstract class TodoParser {
  public static URL_SEPARATOR = '[*url*]';

  protected patterns: Pattern[] = [];
  protected villages: VillagesByCoords = {};
  protected input: AddTasksFormInput;

  public constructor(input: AddTasksFormInput) {
    this.input = input;
  }

  public parse = async (): Promise<NewTask[]> => {
    const matches = this.findMatches(this.input.text);

    if (!matches) {
      throw new Error('No matches found!');
    }

    // make an api request for each todo and fetch their village details
    // this is a hidden dependancy and needs a better sollution
    try {
      await this.loadVillages(this.input.text, this.input.world);
    } catch (err) {
      // Need to fix it on the backend
      console.log(err);
      console.log('Error fetching villages');
    }

    return this.getTodos(matches);
  };

  protected findMatches(message: string): Matches | null {
    for (const pattern of this.patterns) {
      console.log(pattern);
      const matched = message.match(pattern.value);
      if (!matched) continue;

      return {
        pattern: pattern.name,
        value: Array.from(message.matchAll(pattern.value)),
      };
    }

    return null;
  }

  protected async loadVillages(text: string, world: string) {
    if (world === '-1') return;

    const pattern = /\d{3}\|\d{3}/g;
    const coords = text.match(pattern);

    if (!coords) return;

    const villages: VillageData[] = await getVillages(world, coords.filter(this.onlyUnique));
    villages.forEach((village: VillageData) => {
      this.villages[`${village.x}|${village.y}`] = village;
    });
  }

  // is this redundant?
  protected getTodos(matches: Matches) {
    const todos: NewTask[] = [];

    for (const match of matches.value) {
      todos.push(this.parseFromMatch(match, matches.pattern));
    }

    return todos;
  }

  // the + sign replaces the space
  protected replaceCoords(coords: string, key: string = 'name') {
    if (!this.villages[coords] || !this.villages[coords][key]) {
      return coords;
    }

    let result = this.villages[coords][key];

    if (key === 'name') {
      // legacy code, will remove it when tested with all
      //result = decodeURI(result).replaceAll('+', ' ').replaceAll('%2B', '+');
      result = result.replaceAll('+', ' ');
      result = decodeURIComponent(result);
    }

    return result;
  }

  protected generateTodo(dueMs: number, message: string, url: string | undefined = undefined) {
    return {
      id: undefined,
      alarmOffset: Number(this.input.alarmOffset),
      dueMs,
      message,
      type: this.input.type,
      isRepeating: false,
      world: this.input.world,
      url,
    };
  }

  protected getUrl(origin: string, destination?: string): string | undefined {
    return undefined;
  }

  protected wrapInUrl(text: string, url: string | undefined) {
    if (!url) return text;

    return `${TodoParser.URL_SEPARATOR}${text}${TodoParser.URL_SEPARATOR}`;
  }

  protected getUnitFromBBCode(unit: string): string {
    unit = unit.replace(/\[unit\]|\[\/unit\]/g, '');
    unit = unit.replace('snob', 'noble');
    unit = unit.replace('heavy', 'HC');
    unit = unit.replace('light', 'LC');
    unit = unit.replace('knight', 'paladin');

    return unit;
  }

  //Supported formats (all times are in ST and return LT):
  // today at 18:24:28
  // tomorrow at 01:53:49
  // on 18.06. at 01:30:10
  protected getDateFromString(dateStr: string, timeStr: string): Date {
    const dateParts = dateStr.split(' ');
    let date = new Date();
    let day = 0,
      month = 0,
      year = 0;

    if (dateParts.length === 1) {
      date = getRelativeDate(dateParts[0]);
      day = date.getUTCDate();
      month = date.getUTCMonth() + 1;
    } else {
      const parts = dateStr.split(' ')[1].split('.');
      day = Number(parts[0]);
      month = Number(parts[1]);
    }

    year = date.getUTCFullYear();

    return new Date(`${year}-${month}-${day} ${timeStr}`);
  }

  protected abstract parseFromMatch(match: RegExpMatchArray, pattern: string): NewTask;

  private onlyUnique(value: string, index: number, array: string[]) {
    return array.indexOf(value) === index;
  }
}
