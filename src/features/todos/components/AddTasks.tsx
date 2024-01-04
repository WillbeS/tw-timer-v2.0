import { useDispatch } from 'react-redux';

import { addTodosAction, addedTodosAction } from '../store/todoSlice';
import { saveMany } from '../services/todoStorage';
import { saveTasks } from '../api';
import { AddTasksFormInput } from '../data/types';
import { getParser } from '../services/parsers';

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
  const dispatch = useDispatch();

  const onSubmit = async (todoInput: AddTasksFormInput) => {
    dispatch(addTodosAction());

    const todoParser = getParser(todoInput);
    const newTodos = await todoParser.parse();

    const todos = saveMany(newTodos);
    dispatch(addedTodosAction(todos));
    onCloseModal();

    await saveTasks(todos);
    // When proper error handling is done, inform if there's an error
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
