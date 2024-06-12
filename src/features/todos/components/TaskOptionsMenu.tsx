import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { removeAllAction } from '../store/todoSlice';

import { DropdownMenu } from '../../../components/ui/DropdownMenu';
import { DropdownMenuButton } from '../../../components/ui/DropdownMenuButton';

type Props = {
  onSync: () => void;
};

export const TaskOptionsMenu = ({ onSync }: Props) => {
  const dispatch = useDispatch();

  const handleClearLocal = useCallback(() => {
    console.log('Should call it!!!');
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
