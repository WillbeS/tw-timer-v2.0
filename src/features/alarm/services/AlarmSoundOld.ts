import { getSettingsFromStorage } from '../../settings/services/settingsStorage';

// Later the sound file and loop interval will be determined by settings
class AlarmSound {
  private _alarmSound: HTMLAudioElement;
  private _isOn: boolean;

  constructor() {
    console.log('AlarmSound class constructed');
    const { alarmSoundFile } = getSettingsFromStorage();
    const url = `../../../assets/media/${alarmSoundFile}`;
    console.log(url);
    const soundFile = require(`../../../assets/media/${alarmSoundFile}`);
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
