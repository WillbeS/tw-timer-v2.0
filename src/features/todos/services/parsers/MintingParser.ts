import { TodoParser } from './TodoParser';
import { NewTask, AddTasksFormInput, Transport } from '../../data/types';
import { Matches } from './TodoParser';
import { todoTypes } from '../../data/constants';
import { convertUTCtoLocalMS } from '../../../../utils/dateTime';

import { TransportsService } from '../TransportsService';

export class MintingParser extends TodoParser {
  private serverTime: Date | undefined;

  public constructor(input: AddTasksFormInput) {
    super(input);
    this.patterns = [
      {
        name: 'ST',
        value: /(Desktop\sversion|Server\stime:)\s*(\d\d:\d\d:\d\d)\s(\d\d\/\d\d\/\d{4})/,
      },
      // {
      //   name: todoTypes.MINTING,
      //   value:
      //     /.+?\((\d\d\d\|\d\d\d)\)\sK\d\d\s((\d*\.*\d+\s){3})(today|tommorrow)\sat\s(\d\d:\d\d)\s(\d{1,2}:\d\d:\d\d)*/g,
      // },
    ];
  }

  protected findMatches(message: string): Matches | null {
    // split by 'Incoming transports'
    // and this should ignore the ourgoing res
    const [, incomingRes] = message.split('Incoming transports');

    for (const pattern of this.patterns) {
      const matched = incomingRes.match(pattern.value);
      if (!matched) continue;

      if (pattern.name === 'ST') {
        const [, , timeStr, dateStr] = matched;
        this.serverTime = this.getDateFromString(dateStr, timeStr);
        continue;
      }

      return {
        pattern: pattern.name,
        value: Array.from(incomingRes.matchAll(pattern.value)),
      };
    }

    return null;
  }

  protected getTodos(matches: Matches) {
    let transports: Transport[] = [];

    for (const match of matches.value) {
      let [, , res, , dateStr, timeStr, timeLeft] = match; // second is sending village

      // the data lacks the seconds so we make them 0
      let dueDate = this.getDateFromString(dateStr, timeStr + ':00');

      if (this.serverTime) {
        const [hours, minutes, seconds] = timeLeft.split(':').map((v) => Number(v));
        const msLeft = (seconds + minutes * 60 + hours * 60 * 60) * 1000;
        dueDate = new Date(this.serverTime.getTime() + msLeft);
      }

      const [wood, clay, iron] = res.split(' ').map((r) => Number(r.replace('.', '')));
      transports.push({ wood, clay, iron, dueMs: convertUTCtoLocalMS(dueDate) });
    }

    const trasportsService = new TransportsService(transports);
    const dueMs = trasportsService.getNextOverflow(new Date().getTime());

    if (dueMs === 0) {
      throw new Error('No transports are found');
    }

    console.log('Create new minting todo, dueMS: ', dueMs);

    const todo: NewTask = this.generateTodo(dueMs, 'Mint before next overflow');
    todo.details = JSON.stringify(transports);

    return [todo];
  }

  protected parseFromMatch(match: RegExpMatchArray): NewTask {
    // Can I use this at all\?
    return this.generateTodo(0, '');
  }

  // Supported formats:
  // 16/06/2023 08:40:20
  protected getDateFromString(dateStr: string, timeStr: string): Date {
    const [day, month, year] = dateStr.split('/');

    return new Date(`${year}-${month}-${day} ${timeStr}`);
  }
}
