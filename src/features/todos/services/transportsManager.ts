import { Transport } from '../data/types';
import { WH_CAPACITY, WH_BUFFER } from '../data/constants';

// This is a singleton and works only for one minting village for the entire app
// if I want to include more will have to find a way to store multiple transports
class TransportsManager {
  private _transports: Transport[];

  private _totalWood: number;
  private _totalClay: number;
  private _totalIron: number;

  private _isOverflowing;

  public constructor() {
    this._transports = [];

    this._totalWood = WH_BUFFER.wood;
    this._totalClay = WH_BUFFER.clay;
    this._totalIron = WH_BUFFER.iron;

    this._isOverflowing = false;
  }

  public getNextOverflow = (transports: Transport[], lastUpdateMs: number) => {
    let nextOverflowMs = 0;
    this._transports = transports;

    for (const transport of transports) {
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

const transportsManager = new TransportsManager();
export default transportsManager;
