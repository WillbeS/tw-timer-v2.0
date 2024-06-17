import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectForm } from './ConnectForm';

import { RootState } from '../../../store/store';
import { ConnectedWorld } from './ConnectedWorld';

import { addConnectedWorld, removeConnectedWorld } from '../store/worldSlice';

import { generateKey, validateKey } from '../api/fetchKey';
import { addError, addInfo } from '../../messages/store/messageSlice';
import {
  getAdminIdFromStorage,
  getKeyFromStorage,
  removeAdminIdFromStorage,
} from '../services/apiKeySorage';
import { removeKey } from '../api/deleteKey';

import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { RoundedButton } from '../../../components/ui/RoundedButton';

const OpenBtn = () => <RoundedButton label="Connect" symbol="♻" onClick={console.log} />;

export const ConnectWrapper = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const { worlds, connected } = useSelector((state: RootState) => state.worlds);
  const connectedWorlds = worlds.filter((w) => connected[w.tag] !== undefined);
  const unconnectedWorlds = worlds.filter((w) => connected[w.tag] === undefined);

  const dispatch = useDispatch();

  const connectWorld = async (worldTag: string, key: string) => {
    try {
      console.log('start loading');
      key = key ? await validateKey(worldTag, key) : await generateKey(worldTag);

      dispatch(addConnectedWorld({ worldTag, key }));
      setGeneratedKey(key);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        dispatch(addError(error.message));
      }
    } finally {
      console.log('Stop loading');
    }
  };

  const disconnectWorld = async (worldTag: string) => {
    const key = getKeyFromStorage(worldTag);

    if (!key) return; // this is probably unnecessay

    const adminId = getAdminIdFromStorage(worldTag);

    if (!adminId) {
      dispatch(removeConnectedWorld(worldTag));
      return;
    }

    // Will replace this with a static message in the Connected worlds component!!!!!
    // dispatch(
    //   addInfo(
    //     'Be careful, removing the world will also remove all the tasks assosiated with it from the server (this will not affect your local tasks)!',
    //   ),
    // );
    try {
      console.log('Start loading');
      await removeKey(key, adminId);
      removeAdminIdFromStorage(worldTag);
      dispatch(removeConnectedWorld(worldTag));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        dispatch(addError(error.message));
      }
    } finally {
      console.log('Stop loading');
    }
  };

  const onCloseConnectModal = () => {
    setGeneratedKey(null);
    onCloseModal();
  };

  const subHeadingStyles = 'text-xl font-semibold mb-2';

  return (
    <ModalWrapper2
      heading="Connect to Server"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseConnectModal}
      openBtn={<OpenBtn />}
    >
      <div className="px-2 py-3 rounded-md">
        <section className="mb-4">
          <h2 className={subHeadingStyles}>Connected Worlds:</h2>
          <p className="text-sm italic">
            Your tasks for the following worlds will be saved on the server. Use the assosiated key
            to give access to another device/player you want to share them with.
          </p>
          {connectedWorlds.map((cw) => (
            <ConnectedWorld
              key={cw.tag}
              world={cw}
              token={connected[cw.tag]}
              onRemove={disconnectWorld}
            />
          ))}
        </section>

        <section className="mb-4">
          <h2 className={subHeadingStyles}>Connect a world</h2>
          <p className="text-sm italic">
            If you already have a key paste it below, if you leave it empty it will generate a new
            key
          </p>
          {generatedKey && <p className="text-sm p-3 font-bold">The connection was successful/</p>}
          <ConnectForm worlds={unconnectedWorlds} onSubmit={connectWorld} />
        </section>
      </div>
    </ModalWrapper2>
  );
};
