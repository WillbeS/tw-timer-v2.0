// Used in all components
import { MouseEvent } from 'react';

import { CloseBtn } from './CloseBtn';

import { theme } from '../../themes';

type Props = {
  heading: string;
  footer?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
  openBtn?: React.ReactNode;
};

export const ModalWrapper2 = ({
  heading,
  footer,
  isOpen,
  onOpen,
  onClose,
  children,
  openBtn,
}: Props) => {
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

  const getOpenButton = (): React.ReactNode => {
    const defaultBtn = (
      <span className="inline-block rounded-md border py-1 px-3 shadow-sm cursor-pointer">
        Open
      </span>
    );

    return (
      <span aria-label="Add" area-role="button" onClick={handleOpen}>
        {openBtn ? openBtn : defaultBtn}
      </span>
    );
  };

  return (
    <>
      {getOpenButton()}
      {isOpen && (
        <div
          className={`fixed left-0 top-0  z-10 w-full h-full pt-24 overflow-auto bg-gray-950 bg-opacity-40`}
          onClick={handleClose}
        >
          <div
            className={`relative m-auto w-11/12 md:w-4/6 lg:w-5/12 ${theme.bgColors.lightBox} ${theme.textColors.lightBox} pb-3 rounded-md shadow-md`}
            onClick={onIgnoreClose}
          >
            <div className="flex items-center mb-1 py-2 px-4">
              <span className="font-bold">{heading}</span>

              <CloseBtn onCloseClick={handleClose} light={false} />
            </div>
            <div className="px-2.5  py-2">{children}</div>
            {footer && (
              <div className="px-2.5 py-0.5 text-sm text-center">
                <p>{footer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
