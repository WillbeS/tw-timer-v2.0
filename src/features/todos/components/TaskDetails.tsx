import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';

const OpenBtn = () => <span className="pl-2 cursor-pointer">🔎</span>;

type Props = {
  details: {
    heading: string;
    content: string;
  }[];
};

export const TaskDetails = ({ details }: Props) => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  return (
    <ModalWrapper2
      heading={`🔎 Details`}
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <div>
        {details.map((d, i) => {
          return (
            <div key={i} className="flex flex-col sm:flex-row mb-2 text-sm">
              <div className="sm:basis-2/6 font-bold sm:text-right sm:mr-2">{d.heading}</div>
              <div className="sm:basis-4/6">{d.content}</div>
            </div>
          );
        })}
      </div>
    </ModalWrapper2>
  );
};
