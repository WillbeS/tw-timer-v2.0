import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { RoundedButton } from '../../../components/ui/RoundedButton';

import { Help } from './Help';

const OpenBtn = () => <RoundedButton label="Help" symbol="?" onClick={console.log} />;

export const HelpWrapper = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  return (
    <ModalWrapper2
      heading="TW Timer Help"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <Help />
    </ModalWrapper2>
  );
};
