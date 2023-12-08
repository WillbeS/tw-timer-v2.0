import { useEffect, useState, useCallback } from 'react';

type CountdownTimer = {
  remainingTime: number;
  isDue: boolean;
  isOverdue: boolean;
};

const useCountdown = (targetTime: number, offset: number): CountdownTimer => {
  const calcRemainingTime = useCallback(() => targetTime - new Date().getTime(), [targetTime]);

  const [remainingTime, setRemainingTime] = useState(calcRemainingTime());
  const [isDue, setDue] = useState(false);
  const [isOverdue, setOverdue] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDue(false);
      setOverdue(false);
      const remainingTime = calcRemainingTime();

      if (Math.round((remainingTime - offset) / 1000) === 0) {
        setDue(true);
      }

      if (remainingTime - offset <= 0) {
        setOverdue(true);
      }

      setRemainingTime(remainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [calcRemainingTime, offset]);

  return { remainingTime, isDue, isOverdue };
};

export { useCountdown };
