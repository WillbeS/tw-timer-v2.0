import { useModalWrapper } from '../../../hooks/useModalWrapper';
// import { todoTypes } from '../data/constants';
// import { MintingDetails } from './MintingDetails';
// import { MintingTodoView } from '../models/MintingTodoView';
import { TodoView } from '../models/TodoView';
import { BasicModal } from '../../../components/theme';
import { HR } from '../../../components/theme/layout';
import { IconButton } from '../../../components/utils/IconButton';
import { TrashIcon } from '../../../components/utils/icons/TrashIcon';

const OpenBtn = () => <span className="pl-2 cursor-pointer">🔎</span>;

type Props = {
  taskView: TodoView;
  onDelete: (id: string) => void;
};

export const TaskDetails = ({ taskView, onDelete }: Props) => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  return (
    <BasicModal
      heading={`🔎 Details`}
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      {/* This is necessary or the details will be rendered every time the list renders, for every single task!!!! */}
      {modalOpened && (
        <>
          <div className="flex flex-col gap-3">
            <div className="text-sm md:text-base">
              {taskView.getDetails().map((d, i) => {
                // console.log('Rendering the details even though not visible!!!');
                return (
                  <div key={i} className="flex flex-col sm:flex-row mb-2">
                    <div className="sm:basis-2/6 font-bold sm:text-right sm:mr-2">{d.heading}</div>
                    <div className="sm:basis-4/6">{d.content}</div>
                  </div>
                );
              })}

              {/* {taskView.getType() === todoTypes.MINTING ? (
            <MintingDetails viewData={taskView as MintingTodoView} />
          ) : null} */}
            </div>
          </div>
          <HR />
          <div className="p-2 mt-4 flex justify-end gap-4">
            <IconButton
              icon={<TrashIcon />}
              bgColor="bg-red-800"
              bgHoverColor="hover:bg-red-900"
              onClick={() => onDelete(taskView.getId())}
            ></IconButton>
          </div>
        </>
      )}
    </BasicModal>
  );
};
