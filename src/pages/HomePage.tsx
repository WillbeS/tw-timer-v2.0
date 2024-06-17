import { useEffect } from 'react';
import { RootState, useAppDispatch } from '../store/store';
import { getWorlds } from '../features/worlds/store/worldAction';

import { TaskList } from '../features/todos';

import { Welcome, isFirstVisit } from '../features/welcome';
import { useSelector } from 'react-redux';
import { ErrorMessage } from '../features/messages/components/ErrorMasage';
import { InfoMessage } from '../features/messages/components/InfoMasage';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const hasErrors = useSelector((state: RootState) => state.messages.errors.length > 0);
  const hasInfoMessages = useSelector((state: RootState) => state.messages.info.length > 0);

  useEffect(() => {
    dispatch(getWorlds());
  }, [dispatch]);

  return (
    <>
      {hasErrors && <ErrorMessage />}
      {hasInfoMessages && <InfoMessage />}

      <TaskList />
      {isFirstVisit() ? <Welcome /> : null}
      {/* <TaskList /> */}
    </>
  );
};
