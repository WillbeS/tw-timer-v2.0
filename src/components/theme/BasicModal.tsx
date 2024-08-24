import { ReactNode } from 'react';
import { Modal } from '../utils/Modal';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../features/themes/store/themeSlice';

interface BasicModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  openBtn?: ReactNode;
  heading?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export const BasicModal = ({
  isOpen,
  onOpen,
  onClose,
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
      heading={heading}
      footer={footer}
      bgColor={theme.bg.modal}
      textColor={theme.text.modal}
    >
      {children}
    </Modal>
  );
};
