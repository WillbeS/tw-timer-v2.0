import { startLoadingAction, stoptLoadingAction } from '../store/todoSlice';

import { AddTasksFormInput } from '../data/types';
import { getParser } from '../services/parsers';

import { addError } from '../../messages/store/messageSlice';
import { isDuplicate } from '../services/todoStorage';
import { saveTasks } from '../store/taskActions';
import { useAppDispatch } from '../../../store/hooks';

import { TasksForm } from './TasksForm';
import { AddButton, BasicModal } from '../../../components/theme';
import { useModal } from '../../../components/theme/hooks/useModal';

export const AddTasks = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModal();
  const dispatch = useAppDispatch();

  const onSubmit = async (todoInput: AddTasksFormInput) => {
    try {
      dispatch(startLoadingAction());
      const todoParser = getParser(todoInput);
      const newTodos = await todoParser.parse();
      const forSave = newTodos.filter((task) => !isDuplicate(task));
      dispatch(saveTasks({ tasks: forSave, world: todoInput.world }));
    } catch (error: any) {
      dispatch(addError(error.message));
    } finally {
      dispatch(stoptLoadingAction());
      onCloseModal();
    }
  };

  return (
    <BasicModal
      openBtn={<AddButton label="Add Tasks" />}
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      heading="Add Tasks"
    >
      <TasksForm onSubmit={onSubmit} onCancel={onCloseModal} />
    </BasicModal>
  );
};
