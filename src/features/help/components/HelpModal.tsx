import { useModalWrapper } from '../../../hooks/useModalWrapper';

import { ModalWrapper } from '../../../components/ui/ModalWrapper';
import { HelpBtn } from '../../../components/ui/HelpBtn';

type Props = {
  heading?: string;
  content: { heading: string; content: string }[];
};

export const HelpModal = ({ heading = 'Help', content }: Props) => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  return (
    <ModalWrapper
      heading={heading}
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<HelpBtn />}
    >
      <div className="flex flex-col md:py-2 max-w-md mx-auto">
        {content.map((c, i) => {
          return (
            <div key={i} className="mt-2">
              <h3 className="mb-1 font-semibold">{c.heading}</h3>
              <p>{c.content}</p>
            </div>
          );
        })}
      </div>
    </ModalWrapper>
  );
};
