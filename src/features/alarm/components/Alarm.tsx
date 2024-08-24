import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { taskSelector } from '../../todos/store/todoSlice';
import { TaskData } from '../../todos/data/types';

import alarmSound from '../services/AlarmSounds';

import { FeatureToggleSwitch } from '../../../components/theme';

// TODO - refactor this at all cost!!!
export const Alarm = () => {
  const dispatch = useAppDispatch();
  const todos: TaskData[] = Object.values(useAppSelector(taskSelector));
  const timer: Worker = useMemo(
    () => new Worker(new URL('../workers/alarmTimer.ts', import.meta.url)),
    [],
  );

  useEffect(() => {
    if (window.Worker) {
      timer.postMessage([...todos]);
    }
  }, [timer, todos]);

  useEffect(() => {
    if (window.Worker) {
      timer.onmessage = (e: MessageEvent<TaskData>) => {
        alarmSound.play();

        // const todo = e.data;

        // if (todo && todo.type === todoTypes.MINTING) {
        //   const todoView = getTodoView(todo);
        //   const edited = todoView.update();

        //   if (edited) {
        //     dispatch(dynamicUpdateAction(edited));
        //   }
        // }
      };
    }
  }, [timer, dispatch]);

  const handleToggle = () => {
    alarmSound.toggleAlarm();
  };

  // console.log('Alarm is rendering');

  return <FeatureToggleSwitch label="Alarm" onToggle={handleToggle} />;
};
