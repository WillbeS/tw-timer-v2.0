import { getSettingsFromStorage } from '../../settings/services/settingsStorage';

// Later the sound file and loop interval will be determined by settings
export class AlarmSounds {
  private _alarmSound: HTMLAudioElement;
  private _isOn: boolean;

  constructor() {
    const soundFile = require(`../../../assets/media/${getSettingsFromStorage().alarmSoundFile}`);
    this._alarmSound = new Audio(soundFile);
    this._isOn = false;
  }

  public setAudo(newAudio: HTMLAudioElement) {
    this._alarmSound = newAudio;
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

const alarmSound = new AlarmSounds();

export default alarmSound;
