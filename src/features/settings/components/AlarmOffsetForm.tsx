import { TaskTypes } from '../../../data/types';
import { AlarmOffsetSettings } from '../data/types';

type Props = {
  inputStyles: string;
  alarmOffsetSettings: AlarmOffsetSettings;
  onChangeSettings: (newSettings: AlarmOffsetSettings) => void;
};

export const AlarmOffsetForm = ({ inputStyles, alarmOffsetSettings, onChangeSettings }: Props) => {
  const onInputChange = (e: any, taskType: TaskTypes) => {
    const newValues = { ...alarmOffsetSettings, [taskType]: e.target.value };

    onChangeSettings(newValues);
  };

  return (
    <>
      {Object.keys(alarmOffsetSettings).map((type, i) => {
        const taskType = type as TaskTypes;
        return (
          <div className="mb-1" key={i}>
            <div className="mr-4 w-3/6 inline-block">{type}</div>
            <input
              type="number"
              name={type}
              value={alarmOffsetSettings[taskType]}
              className={`${inputStyles} w-2/6`}
              onChange={(e) => onInputChange(e, taskType)}
            />
          </div>
        );
      })}
    </>
  );
};
