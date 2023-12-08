import { useDispatch } from 'react-redux';

import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { addTodosAction, addedTodosAction } from '../store/todoSlice';
import { saveMany } from '../services/todoStorage';
import { saveTasks } from '../api';

import { ModalWrapper } from '../../../components/ui/ModalWrapper';
import { AddBtn } from '../../../components/ui/AddBtn';
import { TodoForm } from './TodoForm';
import { AddTodosFormInput } from '../data/types';
import { getParser } from '../services/parsers';

// Needs to be deleted, not using it!!!!!!
export const AddTodos = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();
  const dispatch = useDispatch();

  const onSubmit = async (todoInput: AddTodosFormInput) => {
    dispatch(addTodosAction());

    const todoParser = getParser(todoInput);
    const newTodos = await todoParser.parse();

    const todos = saveMany(newTodos);

    dispatch(addedTodosAction(todos));
    onCloseModal();
  };

  return (
    <ModalWrapper
      heading="Add Task to the Alarm"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<AddBtn />}
    >
      <div className="flex flex-col md:py-2 max-w-md mx-auto">
        <TodoForm onSubmit={onSubmit} />
      </div>
    </ModalWrapper>
  );
};
