import { TaskList } from '../features/todos';
import { TopContent } from '../features/todos/components/TopContent';

import { Welcome, isFirstVisit } from '../features/welcome';

export const HomePage = () => {
  return (
    <>
      <TopContent />
      <TaskList />
      {isFirstVisit() ? <Welcome /> : null}
      {/* <TaskList /> */}
    </>
  );
};
