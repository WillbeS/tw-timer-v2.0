import { ReactNode } from 'react';
import { Modal } from '../utils/Modal';
import { useModal } from './hooks/useModal';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../features/themes/store/themeSlice';
import { PrimaryButton } from './PrimaryButton';

interface BaseModalProps {
  openBtn?: ReactNode;
  heading?: ReactNode;
  footer?: ReactNode;
  closeBtnLabel?: ReactNode;
  onClose?: () => void;
  children?: ReactNode;
}

export const BaseModal = ({
  openBtn,
  heading,
  footer,
  closeBtnLabel = 'OK',
  onClose,
  children,
}: BaseModalProps) => {
  const { modalOpened, onOpenModal, onCloseModal } = useModal();
  const { theme } = useSelector(themeSelector);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }

    onCloseModal();
  };

  // May use this on another theme modal
  // const Footer = () => {
  //   return (
  //     <div className="flex items-center justify-end">
  //       <PrimaryButton size="small" onClick={handleClose}>
  //         {closeBtnLabel}
  //       </PrimaryButton>
  //     </div>
  //   );
  // };

  return (
    <Modal
      openBtn={openBtn}
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      heading={heading}
      footer={footer}
      bgColor={theme.bgColors.lightBox}
      textColor={theme.textColors.lightBox}
    >
      {children}
    </Modal>
  );
};
