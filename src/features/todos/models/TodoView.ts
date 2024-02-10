import { TaskData } from '../data/types';
import { TodoParser } from '../services/parsers';
import { formatDate, formatTimeIntoText } from '../../../utils/dateTime';
import { truncate } from '../../../utils/stringUtils';

export class TodoView {
  protected todo: TaskData;

  private responsive = [
    { breakpoint: { width: 0, chars: 14 } },
    { breakpoint: { width: 320, chars: 26 } },
    { breakpoint: { width: 425, chars: 50 } },
    { breakpoint: { width: 768, chars: 60 } },
    { breakpoint: { width: 1024, chars: 76 } },
  ];

  constructor(todo: TaskData) {
    //console.log('Construct new TodoView');
    this.todo = todo;
  }

  public getId() {
    return this.todo.id;
  }

  public getTrancatedMessage(innerWidth: number) {
    const urlCharsLength = this.todo.url ? TodoParser.URL_SEPARATOR.length * 2 : 0;
    let maxChars = 0;

    for (const key in this.responsive) {
      const breakpoint = this.responsive[key].breakpoint;

      if (innerWidth > breakpoint.width) {
        maxChars = breakpoint.chars;
      }
    }

    let truncated = truncate(this.todo.message, maxChars + urlCharsLength);
    let urlParts;

    if (this.todo.url) {
      const parts = truncated.split(TodoParser.URL_SEPARATOR);
      if (parts.length === 3) {
        urlParts = {
          url: this.todo.url,
          beforeTxt: parts[0],
          linkTxt: parts[1],
          afterTxt: parts[2],
        };
      }
    }

    return {
      message: truncated,
      urlParts,
    };
  }

  public getMessage() {
    return this.todo.message;
  }

  public getUrl() {
    return this.todo.url;
  }

  public getType() {
    return this.todo.type;
  }

  public getWorld() {
    return this.todo.world !== '-1' ? this.todo.world : 'N/A';
  }

  public getDueDate() {
    return formatDate(this.todo.dueMs);
  }

  public getDueMs() {
    return this.todo.dueMs;
  }

  public getAlarmOffset() {
    return this.todo.alarmOffset * 1000;
  }

  public canUpdate() {
    return false;
  }

  public getDetails() {
    return [
      {
        heading: 'Full message',
        content: this.todo.message.replaceAll('[*url*]', ''),
      },
      {
        heading: 'Type',
        content: this.todo.type,
      },
      {
        heading: 'World',
        content: this.getWorld(),
      },
      {
        heading: 'Due Date',
        content: this.getDueDate() + ' (local time)',
      },
      {
        heading: 'Alarm Offset',
        content: formatTimeIntoText(this.todo.alarmOffset),
      },
    ];
  }

  public update(triggeredBy: string = 'updateBtn'): TaskData | undefined {
    // if needed will be implemented by the child class
    return undefined;
  }
}
