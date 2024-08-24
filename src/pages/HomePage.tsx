import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { getWorlds } from '../features/worlds/store/worldAction';

import { TaskList } from '../features/todos';
import { Welcome, isFirstVisit } from '../features/welcome';
import { fetchWorlds } from '../features/worlds/store/worldAction';
import { fetchAllTasks } from '../features/todos/store/taskActions';
import { connectionSelector } from '../features/security/store/connectionSlice';
// import { WorldData } from '../data/types';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { online, apiKey } = useAppSelector(connectionSelector);

  useEffect(() => {
    dispatch(fetchWorlds());

    if (apiKey) {
      dispatch(fetchAllTasks(apiKey.token));
    }
  }, [dispatch, online, apiKey]);

  console.log('Rendering the Home page');
  // ErrorBoundary test

  // Cache related error
  // const worlds: WorldData[] = JSON.parse(localStorage.getItem('tw_worlds') ?? '[]');
  // if (worlds.length > 0) {
  //   const name: string = worlds[10].name;
  //   console.log(name.toUpperCase());
  // }

  // Other error
  // const arr = ['1', '2'];
  // console.log(arr[5].length);
  return (
    <>
      <TaskList />
      {isFirstVisit() ? <Welcome /> : null}
      {/* <TaskList /> */}
    </>
  );
};
