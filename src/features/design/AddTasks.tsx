import { ModalWrapper2 } from '../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../hooks/useModalWrapper';
import { TasksForm } from './TasksForm';

const OpenBtn = () => (
  <div
    aria-label="Add"
    area-role="button"
    className="text-center rounded-md p-2 md:py-4 md:px-5 lg:w-4/6 mx-auto text-white bg-amber-900 border border-orange-200 border-dashed cursor-pointer mt-2 font-semibold"
  >
    Add Tasks
  </div>
);

export const AddTasks = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  return (
    <ModalWrapper2
      heading="Add Tasks"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <TasksForm />
    </ModalWrapper2>
  );
};
