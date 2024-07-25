import { TaskTypes } from '../../../data/types';
import { AlarmOffsetSettings } from '../../settings/data/types';
import { todoTypes, attackSubtypes } from '../data/constants';
import { AddTasksFormInput, AddTasksFormErrors } from '../data/types';

export class TodoFormView {
  //this should come from the settings
  // private offsetByType = {
  //   [todoTypes.DODGE]: '420',
  //   [todoTypes.ATTACK]: '90',
  //   [todoTypes.SNIPE]: '60',
  //   // [todoTypes.MINTING]: '30',
  //   [todoTypes.REMINDER]: '0',
  // };

  private defaultOffsetValues: AlarmOffsetSettings;

  protected _errors: AddTasksFormErrors = {};

  public constructor(defaultOffset: AlarmOffsetSettings) {
    this.defaultOffsetValues = defaultOffset;
  }

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

  public getOffset(type: TaskTypes) {
    return this.defaultOffsetValues[type];
  }

  // This may become unneeded, should check on cleanup!!!
  public getOffsetByType(type: TaskTypes) {
    return this.defaultOffsetValues[type];
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
