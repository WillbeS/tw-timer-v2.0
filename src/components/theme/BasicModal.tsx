import { ReactNode } from 'react';
import { Modal } from '../utils/Modal';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../features/themes/store/themeSlice';

interface BasicModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  maxWidth?: string;
  openBtn?: ReactNode;
  heading?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export const BasicModal = ({
  isOpen,
  onOpen,
  onClose,
  maxWidth = 'max-w-lg',
  openBtn,
  heading,
  footer,
  children,
}: BasicModalProps) => {
  const { theme } = useSelector(themeSelector);

  return (
    <Modal
      openBtn={openBtn}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      heading={heading}
      footer={footer}
      bgColor={theme.bg.modal}
      textColor={theme.text.modal}
    >
      {children}
    </Modal>
  );
};
