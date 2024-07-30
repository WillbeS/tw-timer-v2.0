import { useState } from 'react';
import { TaskTypes } from '../../../data/types';
import { AlarmOffsetSettings } from '../data/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { settingsSelector, updateAlarmOffsetSettings } from '../store/settingsSlice';

type Props = {
  inputStyles: string;
  // alarmOffset: AlarmOffsetSettings;
};

export const AlarmOffsetForm = ({ inputStyles }: Props) => {
  const { alarmOffset } = useAppSelector(settingsSelector);
  const [alarmOffsetSettings, setAlarmOffsetSettings] = useState({ ...alarmOffset });
  const dispatch = useAppDispatch();

  const onInputChange = (e: any, taskType: TaskTypes) => {
    const newValues = { ...alarmOffsetSettings, [taskType]: e.target.value };

    setAlarmOffsetSettings(newValues);
  };

  const handleSubmit = () => {
    dispatch(updateAlarmOffsetSettings(alarmOffsetSettings));
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
              onBlur={handleSubmit}
            />
          </div>
        );
      })}
    </>
  );
};
