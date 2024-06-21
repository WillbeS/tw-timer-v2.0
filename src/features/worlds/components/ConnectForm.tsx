import { KeyboardEvent, SyntheticEvent, useState } from 'react';

import { WorldData } from '../../../data/types';
import { ValidationError } from '../../../components/form/ValidationError';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { filteredTasksSelector } from '../../todos/store/todoSlice';
import { TaskData } from '../../todos/data/types';

type Props = {
  worlds: WorldData[];
  onSubmit: (worldTag: string, key: string, tasks: TaskData[]) => void;
};

export const ConnectForm = ({ worlds, onSubmit }: Props) => {
  const [world, setWorld] = useState('-1');
  const [key, setKey] = useState('');
  const [errors, setErrors] = useState<{ world?: string | undefined }>({});

  //this is to synch the tasks of a newly connected world
  // but maybe it shouldn't be here!!!
  const tasks = useSelector((state: RootState) => filteredTasksSelector(state, world, '0'));

  const handleSubmit = async (e: SyntheticEvent | KeyboardEvent) => {
    e.preventDefault();

    // Validation
    if (world === '-1') {
      setErrors({ world: 'You need to select a world' });
      return;
    }

    onSubmit(world, key, tasks);

    setWorld('-1');
    setKey('');
    setErrors({});
  };

  const fieldStyle =
    'rounded-md border border-stone-200 focus:outline-none px-4 py-1 text-sm md:text-base bg-white bg-opacity-40 grow';

  function getFieldStyle(fieldError: string | undefined) {
    return `rounded-md border border-stone-200 focus:outline-none px-4 py-1 text-sm md:text-base bg-white bg-opacity-40 ${
      fieldError ? 'border-red-500' : ''
    }`;
  }

  return (
    <form className="w-full md:w-3/4 mx-auto p-2" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col mb-5 bg-transparent">
        <textarea
          value={key}
          id="text"
          rows={2}
          placeholder="Paste your key here if you already have one"
          onChange={(e) => setKey(e.target.value)}
          className={fieldStyle}
        />
      </div>
      <div className="flex flex-row gap-2 bg-transparent">
        <select
          id="world"
          value={world}
          onChange={(e) => {
            setWorld(e.target.value);
            setErrors({});
          }}
          className={getFieldStyle(errors.world)}
        >
          <option value="-1" disabled hidden>
            Select a world
          </option>
          {Object.values(worlds).map((option, i) => (
            <option key={i} value={option.tag}>
              {option.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="h-8 w-32 p-1 px-3 font-semibold bg-yellow-800 text-stone-100 rounded-md"
        >
          Connect
        </button>
      </div>
      <ValidationError fieldError={errors.world} />
    </form>
  );
};
