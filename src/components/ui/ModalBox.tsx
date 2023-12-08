import { useState, MouseEvent } from 'react';
import styles from './ModalBox.module.css';

import { CloseBtn } from './CloseBtn';

type Props = {
  heading: string;
  footer?: string;
  onClose?: () => void;
  children: React.ReactNode;
  openBtn?: React.ReactNode;
};

export const ModalBox = ({ heading, footer, onClose, children, openBtn }: Props) => {
  const [opened, setOpened] = useState(false);

  const handleClose = (e?: MouseEvent<HTMLSpanElement | HTMLDivElement>) => {
    setOpened(false);

    if (e) {
      e.stopPropagation();
    }

    if (onClose) {
      onClose();
    }
  };

  const handleOpen = () => {
    setOpened(true);
  };

  const onIgnoreClose = (e: React.MouseEvent<HTMLSpanElement | HTMLDivElement>) => {
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
      {opened && (
        <div
          className={`fixed left-0 top-0  z-10 w-full h-full pt-24 overflow-auto bg-gray-950 bg-opacity-40`}
          onClick={handleClose}
        >
          <div
            className={`relative bg-orange-50 m-auto w-11/12 lg:w-4/6 p-0 border border-gray-400 shadow-md ${
              opened && styles.showAnimation
            } `}
            onClick={onIgnoreClose}
          >
            <div className="flex items-center mb-1 bg-yellow-800 py-2 px-4">
              <span className="font-bold text-neutral-50">{heading}</span>

              <CloseBtn onCloseClick={handleClose} />
            </div>
            <div className="px-2.5 lg:px-3.5 py-1.5">{children}</div>
            {footer && (
              <div className="bg-yellow-700 px-2.5 py-0.5 text-neutral-50">
                <p>{footer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
