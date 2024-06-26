import { useCallback } from 'react';

import { removeAllAction } from '../store/todoSlice';

import { DropdownMenu } from '../../../components/ui/DropdownMenu';
import { DropdownMenuButton } from '../../../components/ui/DropdownMenuButton';
import { useAppDispatch } from '../../../store/hooks';

type Props = {
  onSync: () => void;
};

export const TaskOptionsMenu = ({ onSync }: Props) => {
  const dispatch = useAppDispatch();

  const handleClearLocal = useCallback(() => {
    try {
      dispatch(removeAllAction());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <DropdownMenu>
      <DropdownMenuButton label="Synchronize" symbol="↺" onClick={onSync} />
      <DropdownMenuButton label="Clear local" symbol="🗑" onClick={handleClearLocal} />
    </DropdownMenu>
  );
};
