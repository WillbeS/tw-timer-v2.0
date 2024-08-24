import { useAppSelector } from '../../../store/hooks';
import { todosSelector } from '../store/todoSlice';

import { ListOptionsMenu } from './ListOptionsMenu';
import { WorldSelect } from '../../worlds/components/WorldSelect';
import { TypeSelect } from './TypeSelect';
import { TopBarDiv } from '../../../components/theme/layout';

export const TopBar = () => {
  const { showCompleted } = useAppSelector(todosSelector);

  return (
    <TopBarDiv>
      <div className="hidden md:block text-md md:text-lg font-semibold ">
        {showCompleted ? 'Completed' : 'Tasks'}
      </div>

      <div className="flex gap-2 scale-x-90 md:scale-x-100 items-center">
        <span className="md:min-w-[124px]">
          <TypeSelect />
        </span>

        <span className="md:min-w-[124px]">
          <WorldSelect />
        </span>

        <ListOptionsMenu />
      </div>
    </TopBarDiv>
  );
};
