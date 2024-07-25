import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { RoundedButton } from '../../../components/ui/RoundedButton';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { connectToServer, disconnecFromServer } from '../store/connectionActions';
import { connectionSelector } from '../store/connectionSlice';
import { ConnectedStatus } from './ConnectedStatus';
import { NotConnectedStatus } from './NotConnectedStatus';

export const RemoteConnection = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();
  const dispatch = useAppDispatch();

  const OpenBtn = () => <RoundedButton label="Connect" symbol="♻" onClick={onOpenModal} />;

  const { online, apiKey } = useAppSelector(connectionSelector);

  const addConnection = (token: string) => {
    dispatch(connectToServer({ token }));
    onCloseModal();
  };

  const deleteConnection = () => {
    dispatch(disconnecFromServer());
    onCloseModal();
  };

  return (
    <ModalWrapper2
      heading="Remote Connection"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <div className="px-2 py-3 rounded-md">
        {apiKey ? (
          <ConnectedStatus token={apiKey.token} onRemove={deleteConnection} />
        ) : (
          <NotConnectedStatus onConnect={addConnection} />
        )}
      </div>
    </ModalWrapper2>
  );
};
