import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { getWorlds } from '../features/worlds/store/worldAction';

import { TaskList } from '../features/todos';
import { TopContent } from '../features/todos/components/TopContent';

import { Welcome, isFirstVisit } from '../features/welcome';

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWorlds());
  }, [dispatch]);

  return (
    <>
      <TopContent />
      <TaskList />
      {isFirstVisit() ? <Welcome /> : null}
      {/* <TaskList /> */}
    </>
  );
};
