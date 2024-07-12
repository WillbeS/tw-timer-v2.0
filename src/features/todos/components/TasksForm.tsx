import { KeyboardEvent, SyntheticEvent, useState } from 'react';

import { TodoFormView } from '../models/TodoFormView';
import { AddTasksFormInput, AddTasksFormErrors } from '../data/types';
import { formatTimeIntoText } from '../../../utils/dateTime';
import { todoTypes, attackSubtypes } from '../data/constants';

import { ValidationError } from '../../../components/form/ValidationError';

import { useAppSelector } from '../../../store/hooks';
import { worldSelector } from '../../worlds/store/worldSlice';
import { UNSELECTED_WORLD } from '../../worlds/data/constants';

type Props = {
  onSubmit: (input: AddTasksFormInput) => void;
  onCancel: () => void;
};

export const TasksForm = ({ onSubmit, onCancel }: Props) => {
  const { worlds, selectedWorld } = useAppSelector(worldSelector);
  const [input, setInput] = useState<AddTasksFormInput>({
    world: selectedWorld,
    type: todoTypes.REMINDER,
    alarmOffset: '0',
    text: '',
    subtype: undefined,
  });

  if (input.type === todoTypes.ATTACK && !input.subtype) {
    setInput({ ...input, subtype: attackSubtypes.CLEAR_NUKE });
  }

  const [errors, setErrors] = useState<AddTasksFormErrors>({});

  const todoFormView = new TodoFormView();

  const handleSubmit = (e: SyntheticEvent | KeyboardEvent) => {
    e.preventDefault();

    const isValid = todoFormView.isValid(input);

    if (isValid && onSubmit) {
      onSubmit(input);
    } else {
      setErrors(todoFormView.errors);
    }
  };

  const onKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return;

    handleSubmit(e);
  };

  const fieldDivStyle = 'flex flex-col mb-5 bg-transparent';
  const labelStyle = 'text-sm px-2 flex flex-row gap-2';

  function getFieldStyle(fieldError: string | undefined) {
    return `rounded-md border border-stone-200 focus:outline-none px-4 py-1 text-sm md:text-base bg-white bg-opacity-40 ${
      fieldError ? 'border-red-500' : ''
    }`;
  }

  if (input.type === todoTypes.ATTACK) {
    console.log('Will add option to choose subtype!');
  }

  return (
    <form className="w-full md:w-3/4 mx-auto" noValidate onSubmit={handleSubmit}>
      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="world">
          <span> Select a world </span>
        </label>
        <select
          id="world"
          value={input.world}
          onChange={(e) => setInput({ ...input, world: e.target.value })}
          className={getFieldStyle(errors.world)}
        >
          <option value={UNSELECTED_WORLD} disabled hidden>
            Select a world
          </option>
          {Object.values(worlds).map((option, i) => (
            <option key={i} value={option.tag}>
              {option.name}
            </option>
          ))}
        </select>
        <ValidationError fieldError={errors.world} />
      </div>

      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="type">
          <span> Select a type </span>
        </label>
        <select
          id="type"
          value={input.type}
          onChange={(e) => {
            setInput({
              ...input,
              type: e.target.value,
              alarmOffset: todoFormView.getOffset(e.target.value),
            });
            // setSelectedType(e.target.value);
          }}
          className={getFieldStyle(errors.type)}
        >
          {Object.values(todoTypes).map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </select>
        <ValidationError fieldError={errors.type} />
      </div>

      {input.type === todoTypes.ATTACK ? (
        <div className={fieldDivStyle}>
          <label className={labelStyle} htmlFor="subtype">
            <span>Select attack type</span>
          </label>
          <select
            id="subtype"
            value={input.subtype}
            onChange={(e) => {
              setInput({
                ...input,
                subtype: e.target.value,
                alarmOffset: todoFormView.getOffset(input.type, e.target.value),
              });
            }}
            className={getFieldStyle(errors.type)}
          >
            {Object.values(attackSubtypes).map((value, i) => (
              <option key={i} value={value}>
                {value}
              </option>
            ))}
          </select>
          <ValidationError fieldError={errors.type} />
        </div>
      ) : null}

      <div className={fieldDivStyle}>
        <label className={labelStyle} htmlFor="alarmOffset">
          {`Alarm offset (play ${formatTimeIntoText(Number(input.alarmOffset))} early)`}
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
          <span>Parse from text or type a reminder</span>
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

      <div className="flex flex-row justify-end gap-2">
        <button
          type="submit"
          className="h-8 p-1 px-3 font-semibold bg-yellow-800 text-stone-100 rounded-md"
        >
          Save
        </button>

        <button
          type="button"
          className="h-8 p-1 px-3 font-semibold bg-stone-500 text-stone-100 rounded-md"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
