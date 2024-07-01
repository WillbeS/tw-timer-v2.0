import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { RoundedButton } from '../../../components/ui/RoundedButton';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { connectToServer } from '../store/connectionActions';
import { connectionSelector } from '../store/connectionSlice';
import { ConnectForm } from './ConnectForm';

export const RemoteConnection = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();
  const dispatch = useAppDispatch();

  const OpenBtn = () => <RoundedButton label="Connect" symbol="♻" onClick={console.log} />;

  const onCloseConnectModal = () => {
    onCloseModal();
  };

  const handleConnect = (token: string) => {
    dispatch(connectToServer({ token }));
  };

  const { online, apiKey } = useAppSelector(connectionSelector);
  const statusText = apiKey ? online : 'not connected';
  const statusTextColor = online ? 'text-green-500' : 'text-red-500';

  return (
    <ModalWrapper2
      heading="Remote Connection"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseConnectModal}
      openBtn={<OpenBtn />}
    >
      <div className="px-2 py-3 rounded-md">
        <section className="mb-4">
          <h2 className="text:md md:text-xl font-semibold mb-2">
            Status: <span className={statusTextColor}>{statusText}</span>
          </h2>
          <p className="text-sm italic">
            {!apiKey &&
              'In order to share your tasks between different devices/users you need to be conected to the server. Otherwise your tasks will be saved only localy. This means that you can see/use them only on this device/browser.'}
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text:md md:text-xl font-semibold mb-2">Connect</h2>
          <p className="text-sm italic">
            If you already have a key paste it below, if you leave it empty it will generate a new
            key
          </p>
          <ConnectForm onSubmit={handleConnect} />
        </section>
      </div>
    </ModalWrapper2>
  );
};
