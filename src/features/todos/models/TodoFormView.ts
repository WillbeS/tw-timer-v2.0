import { todoTypes } from '../data/constants';
import { AddTodosFormInput, AddTodosFormErrors } from '../data/types';

export class TodoFormView {
  private offsetByType = {
    [todoTypes.DODGE]: '420',
    [todoTypes.ATTACK]: '120',
    [todoTypes.SNIPE]: '60',
    [todoTypes.MINTING]: '30',
    [todoTypes.REMINDER]: '0',
  };

  protected _errors: AddTodosFormErrors = {};

  public isValid(todoInput: AddTodosFormInput): boolean {
    this.validateType(todoInput.type);
    this.validateWorld(todoInput.world, todoInput.type);
    this.validateAlarmOffset(todoInput.alarmOffset);
    this.validateText(todoInput.text);

    return Object.keys(this.errors).length === 0;
  }

  public getOffsetByType(type: string) {
    return this.offsetByType[type] ?? '0';
  }

  public get errors(): AddTodosFormErrors {
    return this._errors;
  }

  private validateWorld(world: string, type: string) {
    // Todo - validation
    if (world === '-1' && type !== todoTypes.REMINDER && type !== todoTypes.MINTING) {
      this.addError('world', 'You need to select a word for this type of task');
    }
  }

  private validateType(type: string) {
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
