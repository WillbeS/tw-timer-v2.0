import { RootState } from '../../../store/store';

import { todoTypes } from '../data/constants';

import { Select } from '../../../components/form/Select';
import { theme } from '../../../themes';
import { useAppSelector } from '../../../store/hooks';

import { ListOptionsMenu } from './ListOptionsMenu';
import { WorldSelect } from '../../worlds/components/WorldSelect';
import { todosSelector } from '../store/todoSlice';
import { TypeSelect } from './TypeSelect';

export const TopBar = () => {
  const { showCompleted } = useAppSelector(todosSelector);

  const typeOptions = Object.values(todoTypes).map((value) => {
    return { value, label: value };
  });
  typeOptions.unshift({ value: '0', label: 'All Types' });

  return (
    <div
      className={`mt-6 py-3 border-b ${theme.borderColors.feature} flex justify-end md:justify-between`}
    >
      <div className="hidden md:block text-md md:text-lg font-semibold ">
        {showCompleted ? 'Completed' : 'Tasks'}
      </div>

      <div className="flex gap-2 scale-x-90 md:scale-x-100">
        <TypeSelect />
        <WorldSelect />
        <ListOptionsMenu />
      </div>
    </div>
  );
};
