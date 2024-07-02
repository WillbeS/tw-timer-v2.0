import { useAppDispatch } from '../../../store/hooks';
import { connectToServer } from '../store/connectionActions';
import { ConnectForm } from './ConnectForm';

export const NotConnectedStatus = () => {
  const dispatch = useAppDispatch();

  const handleConnect = (token: string) => {
    dispatch(connectToServer({ token }));
  };

  return (
    <section className="mb-4">
      <h2 className="text:lg md:text-xl font-semibold mb-2">
        Status: <span className="text-red-500">not connected</span>
      </h2>
      <p className="text-sm italic">
        In order to share your tasks between different devices/users you need to be conected to the
        server. Otherwise your tasks will be saved only localy. This means that you can see/use them
        only on this device/browser.
      </p>

      <h2 className="text:sm md:text-md font-semibold my-2">Connect</h2>
      <p className="text-sm italic">
        If you already have a key paste it below, if you leave it empty it will generate a new key
      </p>
      <ConnectForm onSubmit={handleConnect} />
    </section>
  );
};
