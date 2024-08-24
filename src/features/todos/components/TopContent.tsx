import { selectTotalCount } from '../store/todoSlice';

import { AddTasks } from './AddTasks';
import { Alarm } from '../../alarm';

import { useAppSelector } from '../../../store/hooks';
import { TopContentDiv } from '../../../components/theme/layout/TopContentDiv';

export const TopContent = () => {
  const totalCount = useAppSelector(selectTotalCount);

  return (
    <>
      <TopContentDiv>
        <div className="flex justify-between text-md font-bold items-center">
          <span>Total: {totalCount}</span>
          <Alarm />
        </div>
      </TopContentDiv>
      <AddTasks />
    </>
  );
};
