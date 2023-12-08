import { ModalWrapper } from '../../components/ui/ModalWrapper';
import { useModalWrapper } from '../../hooks/useModalWrapper';

const OpenBtn = () => <span className="pl-2 cursor-pointer">🔎</span>;

export const TodosDetails = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  return (
    <ModalWrapper
      heading={`🔎 Details`}
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <div>These are the details, will be editable</div>
    </ModalWrapper>
  );
};
