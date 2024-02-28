import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { todoTypes } from '../data/constants';
import { MintingDetails } from './MintingDetails';
import { TodoView } from '../models/TodoView';
import { MintingTodoView } from '../models/MintingTodoView';

const OpenBtn = () => <span className="pl-2 cursor-pointer">🔎</span>;

type Props = {
  taskView: TodoView;
};

export const TaskDetails = ({ taskView }: Props) => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  return (
    <ModalWrapper2
      heading={`🔎 Details`}
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <div className="text-sm">
        {taskView.getDetails().map((d, i) => {
          return (
            <div key={i} className="flex flex-col sm:flex-row mb-2">
              <div className="sm:basis-2/6 font-bold sm:text-right sm:mr-2">{d.heading}</div>
              <div className="sm:basis-4/6">{d.content}</div>
            </div>
          );
        })}

        {taskView.getType() === todoTypes.MINTING ? (
          <MintingDetails viewData={taskView as MintingTodoView} />
        ) : null}
      </div>
    </ModalWrapper2>
  );
};
