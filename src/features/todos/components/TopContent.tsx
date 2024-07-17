import { selectTotalCount, todosSelector } from '../store/todoSlice';

import { AddTasks } from './AddTasks';
import { Alarm } from '../../alarm';

import { theme } from '../../../themes';
import { useAppSelector } from '../../../store/hooks';
// import { worldSelector } from '../../worlds/store/worldSlice';
// import { UNSELECTED_TYPE } from '../data/constants';

export const TopContent = () => {
  const totalCount = useAppSelector(selectTotalCount);
  // const { selectedWorld } = useAppSelector(worldSelector);
  // const { selectedType } = useAppSelector(todosSelector);

  // const type = selectedType !== UNSELECTED_TYPE ? selectedType : 'all types';

  return (
    <>
      <div className={`${theme.bgColors.button} rounded-md p-2 md:py-3 md:px-5 lg:w-4/6 mx-auto`}>
        <div className="flex justify-between text-md font-bold">
          <span>Total: {totalCount}</span>
          <Alarm />
        </div>
      </div>
      <AddTasks />
    </>
  );
};
