import { TodoView } from './TodoView';

export class DodgeTodoView extends TodoView {
  public DODGE_LAG: number = 60000;

  public update() {
    if (!this.todo.isRepeating) {
      return {
        ...this.todo,
        message: 'Done',
        alarmOffset: 0,
      };
    }

    const nowMs = new Date().getTime();
    if (this.todo.dueMs - this.todo.alarmOffset * 1000 - nowMs > 0) {
      return undefined;
    }

    const message = this.todo.message.replace('Dodge', 'Cancel');

    return {
      ...this.todo,
      message,
      alarmOffset: this.calculateCancelOffset(),
      isRepeating: false,
    };
  }

  private calculateCancelOffset() {
    const dodgeTime = new Date().getTime() + this.DODGE_LAG;

    // the time that's left until the attack lands after the dodge is sent
    const remainingTime = this.todo.dueMs - dodgeTime;
    // adding 1 extra second just to be safe, this will be the new offset
    return Math.floor(remainingTime / 2) / 1000; // should be in seconds
  }
}
