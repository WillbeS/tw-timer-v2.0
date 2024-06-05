import { useEffect, useState } from 'react';

type Props = {
  visible: boolean;
  duration?: number;
};

export const useAnimation = ({ visible, duration = 500 }: Props) => {
  const [animation, setAnimation] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!visible) {
      setAnimation(false);

      timer = setTimeout(() => {
        setAnimationEnded(true);
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [visible, duration]);

  return [animation, animationEnded];
};
