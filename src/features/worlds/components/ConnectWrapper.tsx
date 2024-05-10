import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { RoundedButton } from '../../../components/ui/RoundedButton';

import { ConnectForm } from './ConnectForm';
import { ConnectedWorlds } from './ConnextedWorlds';

const OpenBtn = () => <RoundedButton label="Connect" symbol="♻" onClick={console.log} />;

export const ConnectWrapper = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  const subHeadingStyles = 'text-xl font-semibold mb-1';

  return (
    <ModalWrapper2
      heading="Connect to Server"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <div className="px-2 py-3 rounded-md">
        <section className="mb-4">
          <h2 className={subHeadingStyles}>Connected Worlds:</h2>
          <ConnectedWorlds worldName="World 136" worldId={1} token="sdfsgsgsgs" />
          <ConnectedWorlds worldName="World 140" worldId={7} token="44gssgsgsg" />
        </section>

        <section className="mb-4">
          <h2 className={subHeadingStyles}>Add a world</h2>
          <ConnectForm />
        </section>
      </div>
    </ModalWrapper2>
  );
};
