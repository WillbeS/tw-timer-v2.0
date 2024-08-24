import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { ALARM_SOUNDS } from '../data/constants';
import { settingsSelector, updateAlarmSoundSettings } from '../store/settingsSlice';
import alarmSound from '../../alarm/services/AlarmSounds';
import { Select } from '../../../components/utils/form';

export const AlarmSoundForm = () => {
  const dispatch = useAppDispatch();

  const { alarmSoundFile } = useAppSelector(settingsSelector);

  const loadSound = (fileName: string) => {
    const soundFile = require(`../../../assets/media/${fileName}`);
    return new Audio(soundFile);
  };

  const onInputChange = (newValue: string) => {
    dispatch(updateAlarmSoundSettings(newValue));

    const newSound = loadSound(newValue);
    newSound.play();
    alarmSound.setAudo(newSound);
  };

  return (
    <div className="grid gap-4 mb-4 grid-cols-2">
      <div className="col-span-2">
        <Select
          value={alarmSoundFile}
          onChange={(e) => onInputChange(e.target.value)}
          label="Default sound for all types"
        >
          {Object.keys(ALARM_SOUNDS).map((key) => {
            return (
              <option key={key} value={ALARM_SOUNDS[key]}>
                {key}
              </option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};
