import { RootState } from '../../../store/store';

import { todoTypes } from '../data/constants';

import { Select } from '../../../components/form/Select';
import { theme } from '../../../themes';
import { useAppSelector } from '../../../store/hooks';

import { ListOptionsMenu } from './ListOptionsMenu';
import { WorldSelect } from '../../worlds/components/WorldSelect';
import { todosSelector } from '../store/todoSlice';

type Props = {
  onTypeChange: (type: string) => void;
};
export const TopBar = ({ onTypeChange }: Props) => {
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
        <div>
          <Select options={typeOptions} defaultValue="0" fullWidth onChange={onTypeChange} />
        </div>
        <div>
          <WorldSelect />
        </div>

        <ListOptionsMenu />
      </div>
    </div>
  );
};
