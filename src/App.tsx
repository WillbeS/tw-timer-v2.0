import { Outlet } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';

import { TopContent } from './features/todos/components/TopContent';
import { UIMessage } from './features/messages/components/UIMessage';

import { Header, MainContainer } from './components/theme/layout';
import { Footer } from './components/theme/layout/Footer';
import { useAppSelector } from './store/hooks';
import { themeSelector } from './features/themes/store/themeSlice';

function App() {
  const { theme } = useAppSelector(themeSelector);
  // console.log('App is rendering');

  return (
    <ErrorBoundary>
      <MainContainer>
        <div className="relative ">
          <div className={`${theme.bg.header}`}>
            <div className="md:w-10/12 lg:w-8/12 mx-auto">
              <UIMessage />
              <Header />
            </div>
          </div>

          <main>
            <div className={`${theme.bg.mergeBg}`}>
              <div className="px-2 p-3 md:p-5 md:px-5 md:w-10/12 lg:w-8/12 mx-auto">
                <TopContent />
              </div>
            </div>

            <div className="px-2 md:pb-5 pb-16  md:px-5 md:w-10/12 lg:w-8/12 mx-auto">
              <Outlet />
            </div>
          </main>
        </div>

        <Footer />
      </MainContainer>
    </ErrorBoundary>
  );
}

export default App;
