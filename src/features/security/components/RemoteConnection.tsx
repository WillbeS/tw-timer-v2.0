import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { disconnectTasks } from '../../todos/store/todoSlice';
import { connectToServer, deleteApiKey } from '../store/connectionActions';
import { connectionSelector, disconnectFromServer } from '../store/connectionSlice';

import { ConnectedStatus } from './ConnectedStatus';
import { NotConnectedStatus } from './NotConnectedStatus';
import { AppSpinner, BaseModal, MenuButton } from '../../../components/theme';
import { LinkIcon } from '../../../components/utils/icons/LinkIcon';

const OpenBtn = () => <MenuButton icon={<LinkIcon />}>Connect</MenuButton>;

export const RemoteConnection = () => {
  const dispatch = useAppDispatch();

  const { apiKey, loading } = useAppSelector(connectionSelector);

  const addConnection = (token: string) => {
    dispatch(connectToServer({ token }));
  };

  const deleteConnection = (token: string, deleteForever: boolean) => {
    dispatch(disconnectFromServer());
    dispatch(disconnectTasks());

    if (deleteForever) {
      dispatch(deleteApiKey({ token }));
    }
  };

  return (
    <BaseModal heading="Remote Connection" openBtn={<OpenBtn />}>
      {apiKey ? (
        <ConnectedStatus apiKey={apiKey} onRemove={deleteConnection} />
      ) : (
        <NotConnectedStatus onConnect={addConnection} loading={loading} />
      )}
    </BaseModal>
  );
};
