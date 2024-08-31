import { MouseEvent } from 'react';
import { CloseButton } from './CloseButton';
import { ModalOpenButton } from './ModalOpenButton';

interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  maxWidth?: string;
  bgColor?: string;
  textColor?: string;
  headingBorderColor?: string;
  headingTextColor?: string;
  footerBorderColor?: string;
  heading?: React.ReactNode;
  footer?: React.ReactNode;
  openBtn?: React.ReactNode;
  children?: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onOpen,
  onClose,
  maxWidth = 'max-w-lg',
  bgColor = 'bg-white',
  textColor = 'text-gray-500',
  headingBorderColor = 'border-black/10',
  footerBorderColor = 'border-black/10',
  headingTextColor = 'text-gray-900',
  heading,
  footer,
  openBtn,
  children,
}: ModalProps) => {
  const handleClose = (e: MouseEvent<HTMLElement>) => {
    onClose();
    e.stopPropagation();
  };

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    onOpen();
    e.stopPropagation();
  };

  const onIgnoreClose = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {<ModalOpenButton openBtn={openBtn} handleOpen={handleOpen} />}
      {isOpen && (
        <div
          onClick={handleClose}
          tabIndex={-1}
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 pt-20 overflow-x-hidden overflow-y-auto md:inset-0 h-full bg-black bg-opacity-40"
        >
          <div onClick={onIgnoreClose} className={`relative w-full ${maxWidth} max-h-full mx-auto`}>
            <div className={`relative ${bgColor} rounded-lg shadow`}>
              <div
                className={`flex items-center justify-between p-3 md:p-4 border-b ${headingBorderColor} rounded-t`}
              >
                <h3 className={`text-lg font-medium ${headingTextColor}`}>{heading}</h3>
                <CloseButton onClick={handleClose} />
              </div>

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
        </div>
      )}
    </>
  );
};
