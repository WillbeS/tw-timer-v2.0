import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectIsOn } from '../store/alarmSlice';
import { useCountdown } from '../hooks/useCountdown';
import { formatTime } from '../../../utils/dateTime';
import alarmSound from '../services/AlarmSounds';
import { TodoView } from '../../todos/models/TodoView';

type Props = {
  todoView: TodoView;
};

export const CountdownTimer = ({ todoView }: Props) => {
  const { remainingTime, isDue, isOverdue } = useCountdown(
    todoView.getDueMs(),
    todoView.getAlarmOffset(),
  );
  // const alarmIsOn = useSelector(selectIsOn);

  useEffect(() => {
    // only if workers are not supported
    if (!window.Worker && isDue) {
      // console.log('Is due : ', formatTime(new Date().getTime()));
      alarmSound.play();
    }
  });

  return (
    <div className={`font-mono ${isOverdue ? 'text-red-600' : 'text-inherit'}`}>
      {formatTime(remainingTime, true)}
    </div>
  );
};
