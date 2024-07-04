import { useCallback } from 'react';

import { removeAllAction, showActiveAction, showActiveSelector } from '../store/todoSlice';

import { DropdownMenu } from '../../../components/ui/DropdownMenu';
import { DropdownMenuButton } from '../../../components/ui/DropdownMenuButton';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { addError } from '../../messages/store/messageSlice';
import { deleteManyTasks } from '../store/taskActions';

type Props = {
  // onSync: () => void;
};

export const TaskOptionsMenu = () => {
  const dispatch = useAppDispatch();
  const showActive = useAppSelector(showActiveSelector);
  const connectedWorlds = useAppSelector((state: RootState) => state.worlds.connected);

  const onShowCompleted = () => {
    dispatch(showActiveAction(false));
  };

  const onShowActive = () => {
    dispatch(showActiveAction(true));
  };

  const onClearCompleted = () => {
    try {
      for (const world in connectedWorlds) {
        const apiKey: string = connectedWorlds[world];
        dispatch(deleteManyTasks({ world, apiKey, criteria: 'completed' }));
      }
    } catch (error: any) {
      dispatch(addError(error.message));
    }
  };

  return (
    <DropdownMenu>
      {/* <DropdownMenuButton label="Synchronize" symbol="↺" onClick={onSync} /> */}

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
