import { ModalWrapper2 } from '../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../hooks/useModalWrapper';

const OpenBtn = () => <span className="pl-2 cursor-pointer">🔎</span>;

export const TodosDetails = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  return (
    <ModalWrapper2
      heading={`🔎 Details`}
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <div>These are the details, will be editable</div>
    </ModalWrapper2>
  );
};
