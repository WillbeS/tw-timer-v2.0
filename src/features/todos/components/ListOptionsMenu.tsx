import { useAppDispatch } from '../../../store/hooks';
import { deleteAll, deleteCompleted } from '../store/taskActions';
import { showCompletedAction } from '../store/todoSlice';

import { TopBarOptions } from '../../../components/theme/layout';
import { TrashIcon } from '../../../components/utils/icons/TrashIcon';
import { DropdownMenuButton } from '../../../components/utils/DropdownMenuButton';
import { ClockIcon } from '../../../components/utils/icons/ClockIcon';
import { CheckIcon } from '../../../components/utils/icons/CheckIcon';

export const ListOptionsMenu = () => {
  const dispatch = useAppDispatch();

  const onShowCompleted = () => {
    dispatch(showCompletedAction(true));
  };

  const onShowActive = () => {
    dispatch(showCompletedAction(false));
  };

  const onClearCompleted = () => {
    dispatch(deleteCompleted());
  };

  const onClearAll = () => {
    dispatch(deleteAll());
  };

  return (
    <TopBarOptions>
      {/* <DropdownMenuButton label="Active tasks" symbol="⏰" onClick={onShowActive} /> */}
      <DropdownMenuButton label="Active tasks" icon={<ClockIcon />} onClick={onShowActive} />
      <DropdownMenuButton label="Completed tasks" symbol="✔" onClick={onShowCompleted} />
      {/* <DropdownMenuButton label="Completed tasks" icon={<CheckIcon />} onClick={onShowCompleted} /> */}
      {/* <DropdownMenuButton label="Clear completed" symbol="🗑" onClick={onClearCompleted} /> */}
      <DropdownMenuButton label="Clear completed" icon={<TrashIcon />} onClick={onClearCompleted} />
      {/* <DropdownMenuButton label="Clear all" symbol="🗑" onClick={onClearAll} /> */}
      <DropdownMenuButton label="Clear all" icon={<TrashIcon />} onClick={onClearAll} />
    </TopBarOptions>
  );
};
