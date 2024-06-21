import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
// import { getWorlds } from '../features/worlds/store/worldAction';

import { TaskList } from '../features/todos';
import { Welcome, isFirstVisit } from '../features/welcome';
import { fetchWorlds } from '../features/worlds/store/worldAction';

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorlds());
  }, [dispatch]);

  return (
    <>
      <TaskList />
      {isFirstVisit() ? <Welcome /> : null}
      {/* <TaskList /> */}
    </>
  );
};
