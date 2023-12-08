import { TodoList } from '../features/todos';
import { TopContent } from '../features/todos/components/TopContent';

import { Welcome, isFirstVisit } from '../features/welcome';
import { Temp } from '../features/temp/Temp';

export const HomePage = () => {
  return (
    <>
      {isFirstVisit() ? (
        <Welcome />
      ) : (
        <>
          <TopContent />
          <TodoList />
          {/* <Temp /> */}
        </>
      )}
    </>
  );
};
