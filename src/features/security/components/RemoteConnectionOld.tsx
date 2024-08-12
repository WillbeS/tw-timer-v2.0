import { MenuButton } from '../../../components/theme/MenuButton';
import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { LinkIcon } from '../../../components/utils/icons/LinkIcon';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { disconnectTasks } from '../../todos/store/todoSlice';
import { connectToServer, deleteApiKey } from '../store/connectionActions';
import { connectionSelector, disconnectFromServer } from '../store/connectionSlice';
import { ConnectedStatus } from './ConnectedStatus';
import { NotConnectedStatus } from './NotConnectedStatus';

export const RemoteConnectionOld = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();
  const dispatch = useAppDispatch();

  // const OpenBtn = () => <RoundedButton label="Connect" symbol="♻" onClick={onOpenModal} />;
  const OpenBtn = () => (
    <MenuButton icon={<LinkIcon />} onClick={onOpenModal}>
      Connect
    </MenuButton>
  );

  const { apiKey } = useAppSelector(connectionSelector);

  const addConnection = (token: string) => {
    dispatch(connectToServer({ token }));
    onCloseModal();
  };

  const deleteConnection = (token: string, deleteForever: boolean) => {
    dispatch(disconnectFromServer());
    dispatch(disconnectTasks());

    if (deleteForever) {
      dispatch(deleteApiKey({ token }));
    }

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
          <ConnectedStatus apiKey={apiKey} onRemove={deleteConnection} />
        ) : (
          <NotConnectedStatus onConnect={addConnection} />
        )}
      </div>
    </ModalWrapper2>
  );
};
