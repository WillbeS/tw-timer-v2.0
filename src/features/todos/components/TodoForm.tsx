import { KeyboardEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TodoFormView } from '../models/TodoFormView';
import { AddTodosFormInput, AddTodosFormErrors } from '../data/types';
import { formatTimeIntoText } from '../../../utils/dateTime';
import { todoTypes, worlds } from '../data/constants';

import { ValidationError } from '../../../components/form/ValidationError';
import { HelpModal } from '../../help';

type Props = {
  onSubmit?: (input: AddTodosFormInput) => void;
};

export const TodoForm = ({ onSubmit }: Props) => {
  // const [selectedType, setSelectedType] = useState(todoTypes.REMINDER);
  const [input, setInput] = useState<AddTodosFormInput>({
    world: '-1',
    type: todoTypes.REMINDER,
    alarmOffset: '0',
    text: '',
  });

  const [errors, setErrors] = useState<AddTodosFormErrors>({});
  const todoFormView = new TodoFormView();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent | KeyboardEvent) => {
    e.preventDefault();

    const isValid = todoFormView.isValid(input);

    if (isValid && onSubmit) {
      onSubmit(input);
    } else {
      console.log(todoFormView.errors);
      setErrors(todoFormView.errors);
    }
  };

  const onKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return;

    handleSubmit(e);
  };

  const fieldDivStyle = 'flex flex-col mb-5 bg-transparent';
  const labelStyle = '"text-sm px-2 flex flex-row gap-2';

  function getFieldStyle(fieldError: string | undefined) {
    return `rounded-2xl border border-stone-200 focus:outline-none px-4 py-1 text-sm md:text-base bg-white bg-opacity-40 ${
      fieldError ? 'border-red-500' : ''
    }`;
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="world">
          <span> Select a world </span>
          <HelpModal
            heading={todoFormView.getHelpData('world').heading}
            content={todoFormView.getHelpData('world').content}
          />
        </label>
        <select
          id="world"
          value={input.world}
          onChange={(e) => setInput({ ...input, world: e.target.value })}
          className={getFieldStyle(errors.world)}
        >
          <option value="-1" disabled hidden>
            Select a world
          </option>
          {Object.values(worlds).map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ValidationError fieldError={errors.world} />
      </div>

      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="type">
          Select a type
          <HelpModal
            heading={todoFormView.getHelpData(input.type).heading}
            content={todoFormView.getHelpData(input.type).content}
          />
        </label>
        <select
          id="type"
          value={input.type}
          onChange={(e) => {
            setInput({
              ...input,
              type: e.target.value,
              alarmOffset: todoFormView.getOffsetByType(e.target.value),
            });
            // setSelectedType(e.target.value);
          }}
          className={getFieldStyle(errors.type)}
        >
          <option value="-1" disabled hidden>
            Select a type
          </option>
          {Object.values(todoTypes).map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </select>
        <ValidationError fieldError={errors.type} />
      </div>

      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="alarmOffset">
          {`Alarm offset (play ${formatTimeIntoText(Number(input.alarmOffset))} early)`}
          <HelpModal
            heading={todoFormView.getHelpData('alarmOffset').heading}
            content={todoFormView.getHelpData('alarmOffset').content}
          />
        </label>
        <input
          type="number"
          id="alarmOffset"
          value={input.alarmOffset}
          onChange={(e) => setInput({ ...input, alarmOffset: e.target.value })}
          className={getFieldStyle(errors.alarmOffset)}
        />
        <ValidationError fieldError={errors.alarmOffset} />
      </div>

      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="text">
          Parse from text or type a reminder
        </label>
        <textarea
          id="text"
          rows={10}
          onKeyDown={onKeyPress}
          onChange={(e) => setInput({ ...input, text: e.target.value })}
          className={getFieldStyle(errors.text)}
        />
        <ValidationError fieldError={errors.text} />
      </div>

      <div className="flex flex-row justify-end">
        <button
          type="submit"
          className="h-8 px-6 font-semibold bg-yellow-800 text-stone-100 rounded-lg"
        >
          Add
        </button>
        <button
          type="button"
          className="ml-2 h-8 px-6 font-semibold bg-yellow-800 text-stone-100 rounded-lg"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
