import { ReactNode } from 'react';
import { Modal } from '../utils/Modal';
import { useModal } from './hooks/useModal';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../features/themes/store/themeSlice';

interface BaseModalProps {
  maxWidth?: string;
  openBtn?: ReactNode;
  heading?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export const BaseModal = ({
  maxWidth = 'max-w-lg',
  openBtn,
  heading,
  footer,
  children,
}: BaseModalProps) => {
  const { modalOpened, onOpenModal, onCloseModal } = useModal();
  const { theme } = useSelector(themeSelector);

  return (
    <Modal
      maxWidth={maxWidth}
      openBtn={openBtn}
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      heading={heading}
      footer={footer}
      bgColor={theme.bg.modal}
      textColor={theme.text.modal}
    >
      {children}
    </Modal>
  );
};
