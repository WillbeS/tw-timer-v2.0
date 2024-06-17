import { useEffect, useState } from 'react';

import { MESSAGE_TYPES } from '../../data/constants';

type Props = {
  type?: string;
  children: React.ReactNode;
  onClose?: () => void;
};

const bgColor = {
  [MESSAGE_TYPES.INFO]: 'bg-sky-100',
  [MESSAGE_TYPES.WARNING]: 'bg-orange-100',
  [MESSAGE_TYPES.ERROR]: 'bg-red-100',
};

const textColor = {
  [MESSAGE_TYPES.INFO]: 'text-teal-900',
  [MESSAGE_TYPES.WARNING]: 'text-amber-900',
  [MESSAGE_TYPES.ERROR]: 'text-amber-900',
};

export function ToastMessage({ type = MESSAGE_TYPES.INFO, children, onClose }: Props) {
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
        className={`relative z-50 w-11/12 md:w-3/5 lg:w-1/2 mx-auto my-auto text-left px-4 py-3 rounded-md shadow-md ${textColor[type]} ${bgColor[type]} 
      ${opacityTransition} transition-opacity ease-in duration-300 
  `}
      >
        <div className="ml-7 text-black">{children}</div>
      </div>
    </div>
  );
}
