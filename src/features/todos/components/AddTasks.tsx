import { startLoadingAction, stoptLoadingAction } from '../store/todoSlice';

import { AddTasksFormInput } from '../data/types';
import { getParser } from '../services/parsers';

import { addError } from '../../messages/store/messageSlice';
import { isDuplicate } from '../services/todoStorage';
import { saveTodos } from '../store/taskActions';
import { useAppDispatch } from '../../../store/hooks';

import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { TasksForm } from './TasksForm';

import { theme } from '../../../themes';

const OpenBtn = () => (
  <div
    aria-label="Add"
    area-role="button"
    className={`text-center rounded-md p-2 md:py-4 md:px-5 lg:w-4/6 mx-auto ${theme.bgColors.feature} border ${theme.borderColors.feature} border-dashed cursor-pointer mt-2 font-semibold ${theme.textColors.feature}`}
  >
    Add Tasks
  </div>
);

export const AddTasks = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();
  const dispatch = useAppDispatch();

  const onSubmit = async (todoInput: AddTasksFormInput) => {
    try {
      dispatch(startLoadingAction());
      const todoParser = getParser(todoInput);
      const newTodos = await todoParser.parse();
      const forSave = newTodos.filter((task) => !isDuplicate(task));
      dispatch(saveTodos({ tasks: forSave, world: todoInput.world }));
    } catch (error: any) {
      dispatch(addError(error.message));
    } finally {
      dispatch(stoptLoadingAction());
      onCloseModal();
    }
  };

  return (
    <ModalWrapper2
      heading="Add Tasks"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <TasksForm onSubmit={onSubmit} onCancel={onCloseModal} />
    </ModalWrapper2>
  );
};
