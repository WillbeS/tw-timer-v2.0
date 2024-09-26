import { TaskTypes } from '../../../data/types';
import { AlarmOffsetSettings } from '../../settings/data/types';
import { UNSELECTED_WORLD } from '../../worlds/data/constants';
import { todoTypes } from '../data/constants';
import { AddTasksFormInput, AddTasksFormErrors } from '../data/types';

export class TodoFormView {
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
    this.validateNotes(todoInput.notes);

    if (todoInput.subtype) {
      this.validateSubtype(todoInput.subtype);
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
    console.log(world);
    console.log(type);
    // Todo - validation
    if (
      world === UNSELECTED_WORLD &&
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

  private validateNotes(notes: string) {
    if (notes.length > 50) {
      this.addError('notes', "Notes can't exceed 50 characters");
    }
  }

  private addError(fieldName: string, message: string) {
    this._errors[fieldName] = message;
  }
}
