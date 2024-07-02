import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { RoundedButton } from '../../../components/ui/RoundedButton';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { useAppSelector } from '../../../store/hooks';
import { connectionSelector } from '../store/connectionSlice';
import { ConnectedStatus } from './ConnectedStatus';
import { NotConnectedStatus } from './NotConnectedStatus';

export const RemoteConnection = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  const OpenBtn = () => <RoundedButton label="Connect" symbol="♻" onClick={console.log} />;

  const onCloseConnectModal = () => {
    onCloseModal();
  };

  const { online, apiKey } = useAppSelector(connectionSelector);

  return (
    <ModalWrapper2
      heading="Remote Connection"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseConnectModal}
      openBtn={<OpenBtn />}
    >
      <div className="px-2 py-3 rounded-md">
        {apiKey ? <ConnectedStatus online={online} token={apiKey.token} /> : <NotConnectedStatus />}
      </div>
    </ModalWrapper2>
  );
};
