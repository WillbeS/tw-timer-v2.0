import { TodoView } from './TodoView';

import { TaskData } from '../data/types';
import { formatDate } from '../../../utils/dateTime';

import { TransportsService } from '../services/TransportsService';
import { numberWithSeparator } from '../../../utils/stringUtils';

export class MintingTodoView extends TodoView {
  private trasportsService: TransportsService;

  constructor(todo: TaskData) {
    super(todo);

    // We know for a fact that details are not undefined
    // but later may explicitely assert it
    const details = todo.details as string;

    this.trasportsService = new TransportsService(JSON.parse(details));
  }

  public getGroupedTransports() {
    const groupedTransports = this.trasportsService.groupByMinutes(5);
    const transportsDetails = [];

    transportsDetails.push({
      date: 'Total',
      wood: numberWithSeparator(this.trasportsService.totalWood),
      clay: numberWithSeparator(this.trasportsService.totalClay),
      iron: numberWithSeparator(this.trasportsService.totalIron),
    });

    for (const ms in groupedTransports) {
      const transport = groupedTransports[ms];
      transportsDetails.push({
        date: formatDate(Number(ms)),
        wood: numberWithSeparator(transport.wood),
        clay: numberWithSeparator(transport.clay),
        iron: numberWithSeparator(transport.iron),
      });
    }

    return transportsDetails;
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
