import { useEffect, useState } from 'react';

export interface AlertProps {
  bgColor?: string;
  textColor?: string;
  duration?: number;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Alert = ({
  bgColor = 'bg-blue-50',
  textColor = 'text-blue-800',
  duration = 4000,
  children,
  onClose,
}: AlertProps) => {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(false);

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

  const opacityTransition = show ? 'opacity-100' : 'opacity-0';

  return (
    <div
      className={`fixed left-[9%] md:left-[25%] top-[15%] md:top-[20%] m-auto z-50 w-10/12 md:w-6/12 flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg ${bgColor} ${textColor} ${opacityTransition} transition-opacity ease-in duration-300`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="font-medium">{children}</div>
    </div>
  );
};
