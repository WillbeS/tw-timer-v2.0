import { Select } from '../../../components/form/Select';
import { theme } from '../../../themes';
import { ALARM_SOUNDS } from '../data/constants';

type Props = {
  alarmSoundSettings: string;
  onChangeSettings: (newSettings: string) => void;
};

export const AlarmSoundForm = ({ alarmSoundSettings, onChangeSettings }: Props) => {
  const onInputChange = (newValue: string) => {
    onChangeSettings(newValue);
  };

  const soundOptions = Object.keys(ALARM_SOUNDS).map((key) => {
    return { label: key, value: ALARM_SOUNDS[key] };
  });

  return (
    <div className="md:w-2/3 ml-auto">
      <Select
        options={soundOptions}
        defaultValue={alarmSoundSettings}
        fullWidth
        onChange={(selected) => onInputChange(selected)}
        bgColor="bg-white"
        textColor={theme.textColors.lightBox}
      />
    </div>
  );
};
