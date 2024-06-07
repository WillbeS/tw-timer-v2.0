import { useDispatch } from 'react-redux';

import {
  addPendingForSaveAction,
  addTodosAction,
  startLoadingAction,
  stoptLoadingAction,
} from '../store/todoSlice';
import { saveMany } from '../services/todoStorage';
import { saveTasks } from '../api';
import { AddTasksFormInput } from '../data/types';
import { getParser } from '../services/parsers';

import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { TasksForm } from './TasksForm';

import { theme } from '../../../themes';
import { getWorldKey } from '../../../utils/api';
import { addError } from '../../messages/store/messageSlice';

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
  const dispatch = useDispatch();

  const onSubmit = async (todoInput: AddTasksFormInput) => {
    try {
      dispatch(startLoadingAction());

      const todoParser = getParser(todoInput);
      const newTodos = await todoParser.parse();

      const todos = saveMany(newTodos);
      dispatch(addTodosAction(todos));
      onCloseModal();

      const apiKey = getWorldKey(todoInput.world);

      if (apiKey) {
        const success = await saveTasks(todos, apiKey);

        if (!success) {
          dispatch(addError('There was a problem with the server and your tasks were not saved.'));
        }

        dispatch(addPendingForSaveAction(todos));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(addError(error.message));
      }

      onCloseModal();
    } finally {
      dispatch(stoptLoadingAction());
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
