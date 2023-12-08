import { useState } from 'react';
import { ReactComponent as CrossIcon } from '../../assets/img/cross.svg';
import { ReactComponent as InfoIcon } from '../../assets/img/info.svg';
import { ReactComponent as WarningIcon } from '../../assets/img/warning.svg';
import { useAnimation } from '../../hooks/useAnimation';

type Props = {
  type?: string;
  heading: string;
  children: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
};

export function Alert({ type = 'information', heading, children, closable, onClose }: Props) {
  const [visible, setVisible] = useState(true);
  const [animation, animationEnded] = useAnimation({ visible });

  function handleCloseClick(): void {
    setVisible(false);

    if (onClose) {
      onClose();
    }
  }

  if (!visible && animationEnded) {
    return null;
  }

  return (
    <div
      className={`w-11/12 md:w-5/6 mx-auto my-2.5 flex flex-col text-left px-4 py-3 rounded-md border-1 border-transparent ${
        type === 'warning' ? 'text-amber-900' : 'text-teal-900'
      } ${type === 'warning' ? 'bg-orange-100' : 'bg-sky-100'} ${
        animation ? 'scale-100' : 'scale-0'
      } transition-all duration-150
  `}
    >
      <div className="flex items-center mb-1">
        <span
          role="img"
          aria-label={type === 'warning' ? 'Warning' : 'Information'}
          className="w-7"
        >
          {type === 'warning' ? (
            <WarningIcon className="fill-amber-900 w-5 h-5" />
          ) : (
            <InfoIcon className="fill-teal-900 w-5 h-5" />
          )}
        </span>
        <span className="font-bold">{heading}</span>

        {closable && (
          <button
            aria-label="Close"
            onClick={handleCloseClick}
            className="border-none bg-transparent ml-auto cursor-pointer"
          >
            <CrossIcon />
          </button>
        )}
      </div>
      <div className="ml-7 text-black">{children}</div>
    </div>
  );
}
