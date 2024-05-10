import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import { todoTypes } from '../data/constants';
// import { useFetchWorls } from '../../../hooks/useFetchWorls';

import { Select } from '../../../components/form/Select';
import { TaskOptionsMenu } from './TaskOptionsMenu';
import { theme } from '../../../themes';

type Props = {
  onWorldChange: (world: string) => void;
  onTypeChange: (type: string) => void;
  onSync: () => void;
};
export const TopBar = ({ onWorldChange, onTypeChange, onSync }: Props) => {
  //const worlds = useFetchWorls();
  const { worlds } = useSelector((state: RootState) => state.worlds);

  const typeOptions = Object.values(todoTypes).map((value) => {
    return { value, label: value };
  });
  typeOptions.unshift({ value: '0', label: 'All Types' });

  const worldOptions = worlds.map((w) => {
    return { value: w.tag, label: w.name };
  });
  worldOptions.unshift({ value: '0', label: 'All Worlds' });

  // This is for delete, yes???
  const loadWorlds = () => {
    if (worlds.length === 0) {
      console.log('needs to fetch worlds');
    }
  };

  return (
    <div
      className={`mt-6 py-3 border-b ${theme.borderColors.feature} flex justify-end md:justify-between`}
    >
      <div className="hidden md:block text-md md:text-lg font-semibold ">Tasks</div>

      <div className="flex gap-2 scale-x-90 md:scale-x-100">
        <div>
          <Select options={typeOptions} defaultValue="0" fullWidth onChange={onTypeChange} />
        </div>
        <div onClick={loadWorlds}>
          <Select options={worldOptions} defaultValue="0" fullWidth onChange={onWorldChange} />
        </div>

        <TaskOptionsMenu onSync={onSync} />
      </div>
    </div>
  );
};
