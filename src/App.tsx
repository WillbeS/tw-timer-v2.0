import { Outlet } from 'react-router-dom';

import { Header } from './components/layouts/Header';
import ErrorBoundary from './components/ErrorBoundary';

import { TopContent } from './features/todos/components/TopContent';
import { UIMessage } from './features/messages/components/UIMessage';

import { MainContainer } from './components/theme/MainContainer';

function App() {
  // console.log('App is rendering');

  return (
    <ErrorBoundary>
      <MainContainer>
        <UIMessage />
        <div className="md:w-10/12 lg:w-8/12 mx-auto">
          <Header />
          <main className="py-3 px-2 md:p-5 pb-16">
            <TopContent />
            <Outlet />
          </main>
        </div>
      </MainContainer>
    </ErrorBoundary>
  );
}

export default App;
