import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addTodosAction, addedTodosAction } from '../store/todoSlice';
import { saveMany } from '../services/todoStorage';
import { saveTasks } from '../api';

import { TodoForm } from './TodoForm';
import { AddTodosFormInput } from '../data/types';
import { getParser } from '../services/parsers';

// Need to be deleted, not using it!!!!
export const ParseTodos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (todoInput: AddTodosFormInput) => {
    dispatch(addTodosAction());

    const todoParser = getParser(todoInput);
    const newTodos = await todoParser.parse();

    const todos = saveMany(newTodos);
    console.log(todos);
    saveTasks(todos); // this is async so very wrong!!!

    dispatch(addedTodosAction(todos));
    navigate('/');
  };

  return (
    <div className="flex flex-col md:w-3/5 lg:w-2/5 xl:w-2/7 mx-auto md:mt-8 bg-orange-100 p-3  justify-center border border-yellow-800">
      <h2 className="text-2xl font-semibold mb-1">Parse from Text</h2>
      <p className="text-sm italic mb-3">
        Depending on the type, copy text from your TW account and paste it in the textfield below to
        parse Alarm tasks from it
      </p>
      <TodoForm onSubmit={onSubmit} />
    </div>
  );
};
