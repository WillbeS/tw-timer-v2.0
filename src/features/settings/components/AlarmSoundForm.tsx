import { Select } from '../../../components/form/Select';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { themeSelector } from '../../themes/store/themeSlice';
import { ALARM_SOUNDS } from '../data/constants';
import { settingsSelector, updateAlarmSoundSettings } from '../store/settingsSlice';

export const AlarmSoundForm = () => {
  const { theme } = useAppSelector(themeSelector);
  const dispatch = useAppDispatch();

  const { alarmSoundFile } = useAppSelector(settingsSelector);

  const onInputChange = (newValue: string) => {
    dispatch(updateAlarmSoundSettings(newValue));
    // todo - play sound
  };

  const soundOptions = Object.keys(ALARM_SOUNDS).map((key) => {
    return { label: key, value: ALARM_SOUNDS[key] };
  });

  return (
    <div className="md:w-2/3 ml-auto">
      <Select
        options={soundOptions}
        defaultValue={alarmSoundFile}
        fullWidth
        onChange={(selected) => onInputChange(selected)}
        bgColor="bg-white"
        textColor={theme.textColors.lightBox}
      />
    </div>
  );
};
