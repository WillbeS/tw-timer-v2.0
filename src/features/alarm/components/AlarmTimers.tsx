import { useEffect, useState } from 'react';
import alarmSound from '../services/AlarmSound';
import { formatTime } from '../../../utils/dateTime';

//I may need this for quick tests so qon't delele it yet
type Test = {
  id: number;
  timeDue: number;
  timeRemaining: number;
  activated: boolean;
};
const tests: Test[] = [];
const now = new Date().getTime();
for (let i = 30; i <= 300; i += 15) {
  tests.push({
    id: i,
    timeDue: now + i * 1000,
    timeRemaining: i * 1000,
    activated: false,
  });
}

console.log(tests);

export const AlarmTimer = () => {
  const [timers, setTimers] = useState(tests);
  const [pastTimers, setPastTimers] = useState<Test[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          const updatedTimeRemaining = timer.timeDue - new Date().getTime();
          if (updatedTimeRemaining < 1000 && updatedTimeRemaining > 0) {
            // Timer completed, handle actions here
            // For example, mark the task as completed or show an alert
            alarmSound.play();
          }
          return { ...timer, timeRemaining: updatedTimeRemaining, activated: true };
        }),
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div>
      {timers.map((timer) => (
        <div key={timer.id}>
          <span>{timer.id + '. '}</span>
          <span>Alarm timer:</span>
          <span>{formatTime(timer.timeRemaining)}</span> {/* Display the remaining time */}
        </div>
      ))}
    </div>
  );
};
