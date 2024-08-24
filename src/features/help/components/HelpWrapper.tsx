import { useModalWrapper } from '../../../hooks/useModalWrapper';

import { Help } from './Help';
import { BasicModal, PrimaryButton } from '../../../components/theme';

// TODO the real one
const OpenBtn = () => <PrimaryButton onClick={console.log}>Help</PrimaryButton>;

//delete when safe
export const HelpWrapper = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  return (
    <BasicModal
      heading="TW Timer Help"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <Help />
    </BasicModal>
  );
};
