import { MouseEvent, useState } from 'react';
import { CloseButton } from './CloseButton';

interface ContentBoxProps {
  bgColor?: string;
  textColor?: string;
  headingBorderColor?: string;
  headingTextColor?: string;
  footerBorderColor?: string;
  heading?: React.ReactNode;
  footer?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const ContentBox = ({
  bgColor = 'bg-white',
  textColor = 'text-gray-500',
  headingBorderColor = 'border-black/10',
  footerBorderColor = 'border-black/10',
  headingTextColor = 'text-gray-900',
  heading,
  footer,
  closable,
  onClose,
  children,
}: ContentBoxProps) => {
  const [visible, setVisible] = useState(true);

  const handleClose = (e: MouseEvent<HTMLElement>) => {
    setVisible(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {visible && (
        <div className="w-full mx-auto">
          <div className={` ${bgColor} rounded-lg`}>
            {(heading || closable) && (
              <div
                className={`flex items-center justify-between p-3 md:p-4 border-b ${headingBorderColor} rounded-t`}
              >
                <h3 className={`text-lg font-medium ${headingTextColor}`}>{heading}</h3>
                {closable && <CloseButton onClick={handleClose} />}
              </div>
            )}

            <div className={`p-4 md:p-5 space-y-4 text-base leading-relaxed ${textColor}`}>
              {children}
            </div>

            {footer && (
              <div
                className={`p-3 md:p-4 border-t ${footerBorderColor} text-sm ${textColor} rounded-b`}
              >
                {footer}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
