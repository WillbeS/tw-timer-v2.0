import { useCallback } from 'react';

import { DropdownMenu } from '../../../components/ui/DropdownMenu';
import { DropdownMenuButton } from '../../../components/ui/DropdownMenuButton';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { deleteAll, deleteCompleted } from '../store/taskActions';
import { showCompletedAction } from '../store/todoSlice';

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
    <DropdownMenu>
      <DropdownMenuButton label="Active tasks" symbol="⏰" onClick={onShowActive} />
      <DropdownMenuButton label="Completed tasks" symbol="✔" onClick={onShowCompleted} />
      <DropdownMenuButton label="Clear completed" symbol="🗑" onClick={onClearCompleted} />
      <DropdownMenuButton label="Clear all" symbol="🗑" onClick={onClearAll} />
    </DropdownMenu>
  );
};
