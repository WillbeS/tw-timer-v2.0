import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { getWorlds } from '../features/worlds/store/worldAction';

import { TaskList } from '../features/todos';
import { Welcome, isFirstVisit } from '../features/welcome';
import { fetchWorlds } from '../features/worlds/store/worldAction';
import { fetchAllTasks } from '../features/todos/store/taskActions';
import { connectionSelector } from '../features/security/store/connectionSlice';
import { DropdownMenu } from '../components/utils/DropdownMenu';

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
  //ErrorBoundary test
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
