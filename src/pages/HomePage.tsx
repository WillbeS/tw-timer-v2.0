import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { getWorlds } from '../features/worlds/store/worldAction';

import { TaskList } from '../features/todos';
import { Welcome, isFirstVisit } from '../features/welcome';

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWorlds());
  }, [dispatch]);

  return (
    <>
      <TaskList />
      {isFirstVisit() ? <Welcome /> : null}
      {/* <TaskList /> */}
    </>
  );
};
