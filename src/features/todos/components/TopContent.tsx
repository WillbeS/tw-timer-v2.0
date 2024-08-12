import { selectTotalCount } from '../store/todoSlice';

import { AddTasks } from './AddTasks';
import { Alarm } from '../../alarm';

import { useAppSelector } from '../../../store/hooks';
import { themeSelector } from '../../themes/store/themeSlice';
import { ToggleSwitch } from '../../../components/utils/ToggleSwitch';

export const TopContent = () => {
  const totalCount = useAppSelector(selectTotalCount);
  const { theme } = useAppSelector(themeSelector);

  return (
    <>
      <div className={`${theme.bgColors.button} rounded-md p-2 md:py-3 md:px-5 lg:w-4/6 mx-auto`}>
        <div className="flex justify-between text-md font-bold items-center">
          <span className={theme.textColors.feature}>Total: {totalCount}</span>
          <Alarm />
        </div>
      </div>
      <AddTasks />
    </>
  );
};
