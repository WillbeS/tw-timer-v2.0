import { KeyboardEvent, SyntheticEvent, useState } from 'react';

import { TodoFormView } from '../models/TodoFormView';
import { AddTasksFormInput, AddTasksFormErrors } from '../data/types';
import { formatTimeIntoText } from '../../../utils/dateTime';
import { todoTypes, attackSubtypes } from '../data/constants';

import { useAppSelector } from '../../../store/hooks';
import { worldSelector } from '../../worlds/store/worldSlice';
import { UNSELECTED_WORLD } from '../../worlds/data/constants';
import { settingsSelector } from '../../settings/store/settingsSlice';
import { TaskTypes } from '../../../data/types';
import { Input, Select, Textarea } from '../../../components/utils/form';
import { PrimaryButton, CancelButton } from '../../../components/theme';

export type ModalFormProps = {
  onSubmit?: (input: AddTasksFormInput) => void;
  onCancel?: () => void;
};

export const TasksForm = ({ onSubmit, onCancel }: ModalFormProps) => {
  const { worlds, selectedWorld } = useAppSelector(worldSelector);
  const { alarmOffset } = useAppSelector(settingsSelector);

  const todoFormView = new TodoFormView(alarmOffset);
  const [input, setInput] = useState<AddTasksFormInput>({
    world: selectedWorld,
    type: todoTypes.REMINDER,
    alarmOffset: alarmOffset[TaskTypes.Reminder],
    text: '',
    subtype: undefined,
  });

  if (input.type === todoTypes.ATTACK && !input.subtype) {
    setInput({ ...input, subtype: attackSubtypes.CLEAR_NUKE });
  }

  const [errors, setErrors] = useState<AddTasksFormErrors>({});

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

  if (input.type === todoTypes.ATTACK) {
    console.log('Will add option to choose subtype!');
  }

  return (
    <form className={`max-w-sm mx-auto`} noValidate onSubmit={handleSubmit}>
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <Select
            label="Select a world"
            value={input.world}
            onChange={(e) => setInput({ ...input, world: e.target.value })}
            validationError={errors.world}
          >
            <option value={UNSELECTED_WORLD} disabled hidden>
              Select a world
            </option>
            {Object.values(worlds).map((option, i) => (
              <option key={i} value={option.tag}>
                {option.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="col-span-2">
          <Select
            label="Select a type"
            value={input.type}
            onChange={(e) => {
              setInput({
                ...input,
                type: e.target.value,
                alarmOffset: todoFormView.getOffset(e.target.value as TaskTypes),
              });
            }}
            validationError={errors.type}
          >
            {Object.values(todoTypes).map((value, i) => (
              <option key={i} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>

        {input.type === todoTypes.ATTACK && (
          <div className="col-span-2">
            <Select
              label="Select attack type"
              value={input.subtype}
              onChange={(e) => {
                setInput({
                  ...input,
                  subtype: e.target.value,
                });
              }}
              validationError={errors.subtype}
            >
              {Object.values(attackSubtypes).map((value, i) => (
                <option key={i} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </div>
        )}

        <div className="col-span-2">
          <Input
            type="number"
            label={`Alarm offset (play ${formatTimeIntoText(Number(input.alarmOffset))} early)`}
            value={input.alarmOffset}
            onChange={(e) => setInput({ ...input, alarmOffset: e.target.value })}
            validationError={errors.alarmOffset}
          />
        </div>

        <div className="col-span-2">
          <Textarea
            label="Parse from text or type a reminder"
            value={input.text}
            rows={6}
            onKeyDown={onKeyPress}
            onChange={(e) => setInput({ ...input, text: e.target.value })}
            validationError={errors.text}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <PrimaryButton type="submit">Save</PrimaryButton>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </div>
    </form>
  );
};
