import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { getWorlds } from '../features/worlds/store/worldAction';

import { TaskList } from '../features/todos';
import { Welcome, isFirstVisit } from '../features/welcome';
import { fetchWorlds } from '../features/worlds/store/worldAction';
import { fetchAllTasks } from '../features/todos/store/taskActions';
import { connectionSelector } from '../features/security/store/connectionSlice';
import { Button } from '../components/utils/Button';

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
  return (
    <>
      <Button onClick={() => console.log('Clicked!!!')}>Button</Button>
      <TaskList />
      {isFirstVisit() ? <Welcome /> : null}
      {/* <TaskList /> */}
    </>
  );
};
