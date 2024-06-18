import { useEffect, useState } from 'react';

import { MessageTypes } from '../../data/types';

type Props = {
  type?: MessageTypes;
  children: React.ReactNode;
  onClose?: () => void;
};

const bgColor = {
  [MessageTypes.Success]: 'bg-green-100',
  [MessageTypes.Info]: 'bg-sky-100',
  [MessageTypes.Warning]: 'bg-orange-100',
  [MessageTypes.Error]: 'bg-red-100',
};

const textColor = {
  [MessageTypes.Success]: 'text-green-900',
  [MessageTypes.Info]: 'text-teal-900',
  [MessageTypes.Warning]: 'text-orange-900',
  [MessageTypes.Error]: 'text-red-900',
};

export function ToastMessage({ type = MessageTypes.Info, children, onClose }: Props) {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);
  const duration = 4000;

  // animation
  useEffect(() => {
    const fadeIn = setTimeout(() => {
      setShow(true);
    }, 100);

    const activeDuration = setTimeout(() => {
      setShow(false);
    }, duration);

    const fadeOut = setTimeout(() => {
      if (onClose) {
        onClose();
      }
      setHide(true);
    }, duration + 700);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(activeDuration);
      clearTimeout(fadeOut);
    };
  }, []);

  if (hide) {
    return null;
  }

  console.log('Show: ', show);
  console.log('Hide: ', hide);

  const opacityTransition = show ? 'opacity-100' : 'opacity-0';

  return (
    <div
      className={`fixed left-0 top-0 z-50 w-full h-full pt-32 md:pt-48 overflow-auto bg-opacity-0`}
    >
      <div
        className={`relative z-50 w-11/12 md:w-3/5 lg:w-1/2 mx-auto my-auto text-left px-3 py-2 rounded-lg shadow-lg ${bgColor[type]} 
      ${opacityTransition} transition-opacity ease-in duration-300 
  `}
      >
        <div className={`${textColor[type]} text-center font-bold`}>{children}</div>
      </div>
    </div>
  );
}
