import { useDispatch } from 'react-redux';

import {
  addPendingForSaveAction,
  addTasksAction,
  startLoadingAction,
  stoptLoadingAction,
} from '../store/todoSlice';

import { saveTasks } from '../api';
import { AddTasksFormInput, TaskData } from '../data/types';
import { getParser } from '../services/parsers';

import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { TasksForm } from './TasksForm';

import { theme } from '../../../themes';
import { addError, addMessage, addSuccess } from '../../messages/store/messageSlice';
import { getKeyFromStorage } from '../../worlds/services/apiKeySorage';
import { isDuplicate } from '../services/todoStorage';
import { MessageTypes } from '../../../data/types';

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
      const forSave = newTodos.filter((task) => !isDuplicate(task));

      dispatch(addTasksAction(forSave));
      onCloseModal();

      await saveToServer(todoInput.world, forSave);
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(addError(error.message));
      }

      onCloseModal();
    } finally {
      dispatch(stoptLoadingAction());
    }
  };

  const saveToServer = async (world: string, todos: TaskData[]) => {
    const apiKey = getKeyFromStorage(world);
    if (!apiKey) return;

    try {
      await saveTasks(todos, apiKey);
      dispatch(addSuccess('Your tasks were successfully saved on the server.'));
    } catch (error) {
      const todoIds = Object.values(todos).map((todo) => todo.id);
      dispatch(addPendingForSaveAction(todoIds));
      throw Error('There was a problem with the server and your tasks were not saved.');
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
