import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { todoTypes } from '../data/constants';
import { MintingDetails } from './MintingDetails';
import { TodoView } from '../models/TodoView';
import { MintingTodoView } from '../models/MintingTodoView';
import { RoundedButton } from '../../../components/ui/RoundedButton';

const OpenBtn = () => <span className="pl-2 cursor-pointer">🔎</span>;

type Props = {
  taskView: TodoView;
  onDelete: (id: string) => void;
};

export const TaskDetails = ({ taskView, onDelete }: Props) => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  return (
    <ModalWrapper2
      heading={`🔎 Details`}
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <div className="flex flex-col gap-3">
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
      </div>
      <div className="border-t border-slate-300 p-2 mt-4 flex justify-end gap-4">
        {/* <RoundedButton label="Edit" symbol="✐" /> */}
        <RoundedButton
          label="Delete"
          symbol="🗑"
          bgColor="bg-red-800"
          onClick={() => onDelete(taskView.getId())}
        />
      </div>
    </ModalWrapper2>
  );
};
