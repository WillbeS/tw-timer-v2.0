import { selectTotalCount } from '../store/todoSlice';

import { AddTasks } from './AddTasks';
import { Alarm } from '../../alarm';

import { theme } from '../../../themes';
import { useAppSelector } from '../../../store/hooks';

export const TopContent = () => {
  const totalCount = useAppSelector(selectTotalCount);
  return (
    <>
      <div className={`${theme.bgColors.button} rounded-md p-2 md:py-3 md:px-5 lg:w-4/6 mx-auto`}>
        <div className="flex justify-between text-md font-bold">
          <span>Tasks: {totalCount}</span>
          <Alarm />
        </div>
      </div>
      <AddTasks />
    </>
  );
};
