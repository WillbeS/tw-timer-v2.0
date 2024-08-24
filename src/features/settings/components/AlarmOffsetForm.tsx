import { useState } from 'react';
import { TaskTypes } from '../../../data/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { settingsSelector, updateAlarmOffsetSettings } from '../store/settingsSlice';
import { Input } from '../../../components/utils/form';

export const AlarmOffsetForm = () => {
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
    <div className="grid gap-4 mb-4 grid-cols-4">
      {Object.keys(alarmOffsetSettings).map((type, i) => {
        const taskType = type as TaskTypes;
        return (
          <div className="col-span-2 sm:col-span-1" key={i}>
            <Input
              type="number"
              label={type}
              value={alarmOffsetSettings[taskType]}
              onChange={(e) => onInputChange(e, taskType)}
              onBlur={handleSubmit}
            />
          </div>
        );
      })}
    </div>
  );
};
