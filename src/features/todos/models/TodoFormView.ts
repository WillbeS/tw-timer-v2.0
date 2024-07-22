import { todoTypes, attackSubtypes } from '../data/constants';
import { AddTasksFormInput, AddTasksFormErrors } from '../data/types';

export class TodoFormView {
  //this should come from the settings
  private offsetByType = {
    [todoTypes.DODGE]: '420',
    [todoTypes.ATTACK]: '90',
    [todoTypes.SNIPE]: '60',
    // [todoTypes.MINTING]: '30',
    [todoTypes.REMINDER]: '0',
  };

  private offsetBySubtype = {
    [attackSubtypes.CLEAR_NUKE]: '90',
    [attackSubtypes.CAT_NUKE]: '90',
    [attackSubtypes.ANTI_SNIPE]: '150',
    [attackSubtypes.NOBLE_NUKE]: '90',
    [attackSubtypes.SPLIT_NOBLE_TRAIN]: '150',
    [attackSubtypes.NOBLE_TRAIN]: '120',
    [attackSubtypes.FANG]: '90',
    [attackSubtypes.TIMED_FAKE]: '60',
  };

  protected _errors: AddTasksFormErrors = {};

  public isValid(todoInput: AddTasksFormInput): boolean {
    this.validateType(todoInput.type);
    this.validateWorld(todoInput.world, todoInput.type);
    this.validateAlarmOffset(todoInput.alarmOffset);
    this.validateText(todoInput.text);

    if (todoInput.subtype) {
      this.validateType(todoInput.subtype);
    }

    return Object.keys(this.errors).length === 0;
  }

  public getOffset(type: string, subtype?: string) {
    if (subtype) {
      return this.offsetBySubtype[subtype];
    }

    return this.offsetByType[type] ?? '0';
  }

  // This may become unneeded, should check on cleanup!!!
  public getOffsetByType(type: string) {
    return this.offsetByType[type] ?? '0';
  }

  public get errors(): AddTasksFormErrors {
    return this._errors;
  }

  private validateWorld(world: string, type: string) {
    // Todo - validation
    if (
      world === '-1' &&
      type !== todoTypes.REMINDER
      // && type !== todoTypes.MINTING
    ) {
      this.addError('world', 'You need to select a word for this type of task');
    }
  }

  private validateType(type: string) {
    // Todo - validation
  }

  private validateSubtype(subtype: string) {
    // Todo - validation
  }

  private validateAlarmOffset(alarmOffset: string) {
    // Todo - validation
  }

  private validateText(text: string) {
    if (text === '') {
      this.addError('text', 'Text for parsing cannot be empty');
    }
  }

  private addError(fieldName: string, message: string) {
    this._errors[fieldName] = message;
  }
}
