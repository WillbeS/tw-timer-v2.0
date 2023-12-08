import { Transport } from '../data/types';
import { WH_CAPACITY, WH_BUFFER } from '../data/constants';
import { Resources } from '../../../data/types';

type GropuedByTime = {
  [time: number]: Resources;
};

export class TransportsService {
  private _transports: Transport[];
  private _pastTransports: Transport[];

  private _totalWood: number;
  private _totalClay: number;
  private _totalIron: number;

  private _isOverflowing;

  public constructor(transports: Transport[]) {
    this._transports = [...transports];
    this._pastTransports = [];

    this._totalWood = WH_BUFFER.wood;
    this._totalClay = WH_BUFFER.clay;
    this._totalIron = WH_BUFFER.iron;

    this._isOverflowing = false;
  }

  private resetWH() {
    this._totalWood = WH_BUFFER.wood;
    this._totalClay = WH_BUFFER.clay;
    this._totalIron = WH_BUFFER.iron;
  }

  private updateTransports(lastUpdateMs: number) {
    const leftTransports: Transport[] = [];

    for (const transport of this._transports) {
      if (transport.dueMs - lastUpdateMs > 0) {
        leftTransports.push(transport);
      } else {
        this._pastTransports.push(transport);
      }
    }

    this._transports = leftTransports;
  }

  public getNextOverflow = (lastUpdateMs: number) => {
    let nextOverflowMs = 0;
    this.resetWH();
    const oldTransports = [...this._transports];

    for (const transport of oldTransports) {
      // it was reached with the prev transport
      // this check is needed so that all the transports with the same ms are removed as well
      if (nextOverflowMs !== 0 && nextOverflowMs !== transport.dueMs) break;

      // the trasport is in the past
      if (transport.dueMs - lastUpdateMs <= 0) {
        this._transports.shift();
        continue;
      }

      this.addWood(transport.wood);
      this.addClay(transport.clay);
      this.addIron(transport.iron);

      if (this._isOverflowing) {
        nextOverflowMs = transport.dueMs;
      }
    }

    return nextOverflowMs;
  };

  // should use this also to implement minute and hour grouping
  public getBySecond() {
    this.updateTransports(new Date().getTime());
    this.restetTotalRes();

    const bySecond: GropuedByTime = {};

    for (const transport of this._transports) {
      if (!bySecond[transport.dueMs]) {
        bySecond[transport.dueMs] = {
          wood: 0,
          clay: 0,
          iron: 0,
        };
      }

      bySecond[transport.dueMs].wood += transport.wood;
      bySecond[transport.dueMs].clay += transport.clay;
      bySecond[transport.dueMs].iron += transport.iron;

      this.updateTotalRes(transport.wood, transport.clay, transport.iron);
    }

    return bySecond;
  }

  public getByMinute() {
    this.updateTransports(new Date().getTime());
    this.restetTotalRes();

    const grouped: GropuedByTime = {};

    for (const transport of this._transports) {
      const seconds = new Date(transport.dueMs).getSeconds();
      const minutesMs = transport.dueMs - seconds * 1000;
      if (!grouped[minutesMs]) {
        grouped[minutesMs] = {
          wood: 0,
          clay: 0,
          iron: 0,
        };
      }

      grouped[minutesMs].wood += transport.wood;
      grouped[minutesMs].clay += transport.clay;
      grouped[minutesMs].iron += transport.iron;

      this.updateTotalRes(transport.wood, transport.clay, transport.iron);
    }

    return grouped;
  }

  private updateTotalRes(wood: number, clay: number, iron: number) {
    this._totalWood += wood;
    this._totalClay += clay;
    this._totalIron += iron;
  }

  private restetTotalRes() {
    this._totalWood = 0;
    this._totalClay = 0;
    this._totalIron = 0;
  }

  public get transports() {
    return this._transports;
  }

  public setTransports(transports: Transport[]) {
    this._transports = transports;
  }

  public get totalWood() {
    return this._totalWood;
  }

  public get totalClay() {
    return this._totalClay;
  }

  public get totalIron() {
    return this._totalIron;
  }

  private addWood(wood: number) {
    this._totalWood += wood;
    this._isOverflowing = this._totalWood >= WH_CAPACITY;
  }

  private addClay(clay: number) {
    this._totalClay += clay;
    this._isOverflowing = this._totalClay >= WH_CAPACITY;
  }

  private addIron(iron: number) {
    this._totalIron += iron;
    this._isOverflowing = this._totalIron >= WH_CAPACITY;
  }
}
