import { TodoView } from './TodoView';

import { TaskData } from '../data/types';
import { formatDate } from '../../../utils/dateTime';

import { TransportsService } from '../services/TransportsService';

export class MintingTodoView extends TodoView {
  private trasportsService: TransportsService;

  constructor(todo: TaskData) {
    super(todo);

    // We know for a fact that details are not undefined
    // but later may explicitely assert it
    const details = todo.details as string;

    this.trasportsService = new TransportsService(JSON.parse(details));
  }

  public getDetails(): { heading: string; content: string }[] {
    const details = super.getDetails();
    //const transportsBySecond = this.trasportsService.getBySecond();
    const transportsByMinute = this.trasportsService.getByMinute();

    details.push({
      heading: 'Total incoming res',
      content: `Wood: ${this.trasportsService.totalWood}, clay: ${this.trasportsService.totalClay}, iron: ${this.trasportsService.totalIron}`,
    });

    details.push({
      heading: `All transports (${this.trasportsService.transports.length})`,
      content: `Grouped by minutes (${Object.keys(transportsByMinute).length}):`,
    });

    for (const ms in transportsByMinute) {
      const transport = transportsByMinute[ms];
      details.push({
        heading: formatDate(Number(ms)),
        content: `Wood: ${transport.wood}, clay: ${transport.clay}, iron: ${transport.iron}`,
      });
    }

    return details;
  }

  public update(triggeredBy: string = 'updateBtn') {
    switch (triggeredBy) {
      case 'updateBtn':
        return this.updateTransports();
    }

    return undefined;
  }

  public updateTransports(): TaskData {
    const dueMs = this.trasportsService.getNextOverflow(new Date().getTime());
    const transports = this.trasportsService.transports;
    if (dueMs === 0) {
      // minting is done
      return {
        ...this.todo,
        message: 'Done',
        details: JSON.stringify(transports),
      };
    }

    return { ...this.todo, dueMs, details: JSON.stringify(transports) };
  }

  public canUpdate() {
    return true;
  }
}
