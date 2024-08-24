import { AppSpinner } from '../../../components/theme';
import { Heading2, Heading3, HR, Section } from '../../../components/theme/layout';
import { ConnectForm } from './ConnectForm';

type Props = {
  onConnect: (token: string) => void;
  loading: boolean;
};

export const NotConnectedStatus = ({ onConnect, loading }: Props) => {
  return (
    <Section>
      <Heading2>
        Status: <span className="text-red-500">not connected</span>
      </Heading2>
      <p className="text-sm">
        In order to share your tasks between different devices/users you need to be conected to the
        server. Otherwise your tasks will be saved only localy. This means that you can see/use them
        only on this device/browser.
      </p>

      <HR />
      {loading && (
        <div className="flex justify-center">
          <AppSpinner />
        </div>
      )}
      <Heading3>Connect</Heading3>
      <p className="text-sm italic">
        If you already have a key paste it below, if you leave it empty it will generate a new key
      </p>
      <ConnectForm onSubmit={onConnect} />
    </Section>
  );
};
