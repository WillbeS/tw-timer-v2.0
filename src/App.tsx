import { Outlet } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';

import { TopContent } from './features/todos/components/TopContent';
import { UIMessage } from './features/messages/components/UIMessage';

import { Header, MainContainer } from './components/theme/layout';
import { Footer } from './components/theme/layout/Footer';

function App() {
  // console.log('App is rendering');

  return (
    <ErrorBoundary>
      <MainContainer>
        <div className="relative md:w-10/12 lg:w-8/12 mx-auto">
          <UIMessage />
          <Header />
          <main className="py-3 px-2 md:p-5 pb-16">
            <TopContent />
            <Outlet />
          </main>
        </div>

        <Footer />
      </MainContainer>
    </ErrorBoundary>
  );
}

export default App;
