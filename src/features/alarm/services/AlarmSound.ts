import { sounds } from '../../../data/constants';

// Later the sound file and loop interval will be determined by settings
class AlarmSound {
  private _alarmSound: HTMLAudioElement;
  private _isOn: boolean;

  constructor() {
    const soundFile = require(`../../../assets/media/${sounds.BEEP}`);
    this._alarmSound = new Audio(soundFile);
    this._isOn = false;
  }

  public play() {
    if (this._isOn) {
      this._alarmSound.play();
    }
  }

  public stop() {
    this._alarmSound.pause();
  }

  public toggleAlarm() {
    console.log('Toggle alarm');
    this._isOn = !this._isOn;
  }

  public get isOn() {
    return this._isOn;
  }
}

const alarmSound = new AlarmSound();

export default alarmSound;
