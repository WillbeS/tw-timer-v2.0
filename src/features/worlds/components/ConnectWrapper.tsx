import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { connectWorld, disconnectWorld } from '../store/worldAction';
import { useAppDispatch } from '../../../store/hooks';

import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { RoundedButton } from '../../../components/ui/RoundedButton';
import { ConnectForm } from './ConnectForm';
import { ConnectedWorld } from './ConnectedWorld';
import { TaskData } from '../../todos/data/types';

const OpenBtn = () => <RoundedButton label="Connect" symbol="♻" onClick={console.log} />;

export const ConnectWrapper = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  const { worlds, connected } = useSelector((state: RootState) => state.worlds);
  const connectedWorlds = worlds.filter((w) => connected[w.tag] !== undefined);
  const unconnectedWorlds = worlds.filter((w) => connected[w.tag] === undefined);

  const dispatch = useAppDispatch();

  const handleConnectWorld = async (worldTag: string, key: string, tasks: TaskData[]) => {
    dispatch(connectWorld({ key, world: worldTag, tasks }));
  };

  const handleDisconnectWorld = async (world: string) => {
    dispatch(disconnectWorld(world));
  };

  const onCloseConnectModal = () => {
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
              onRemove={handleDisconnectWorld}
            />
          ))}
        </section>

        <section className="mb-4">
          <h2 className={subHeadingStyles}>Connect a world</h2>
          <p className="text-sm italic">
            If you already have a key paste it below, if you leave it empty it will generate a new
            key
          </p>
          <ConnectForm worlds={unconnectedWorlds} onSubmit={handleConnectWorld} />
        </section>
      </div>
    </ModalWrapper2>
  );
};
