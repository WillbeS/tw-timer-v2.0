import { showActiveAction, showActiveSelector } from '../store/todoSlice';

import { DropdownMenu } from '../../../components/ui/DropdownMenu';
import { DropdownMenuButton } from '../../../components/ui/DropdownMenuButton';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { deleteCompleted } from '../store/taskActions';

export const TaskOptionsMenu = () => {
  const dispatch = useAppDispatch();
  const showActive = useAppSelector(showActiveSelector);

  const onShowCompleted = () => {
    dispatch(showActiveAction(false));
  };

  const onShowActive = () => {
    dispatch(showActiveAction(true));
  };

  const onClearCompleted = () => {
    dispatch(deleteCompleted());
  };

  return (
    <DropdownMenu>
      {!showActive && (
        <DropdownMenuButton label="Show active tasks" symbol="✔" onClick={onShowActive} />
      )}

      {showActive && (
        <DropdownMenuButton label="Show completed tasks" symbol="✔" onClick={onShowCompleted} />
      )}

      <DropdownMenuButton label="Clear completed" symbol="🗑" onClick={onClearCompleted} />
    </DropdownMenu>
  );
};
