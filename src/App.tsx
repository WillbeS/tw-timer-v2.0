import { Outlet } from 'react-router-dom';

import { Header } from './components/layouts/Header';
import ErrorBoundary from './components/ErrorBoundary';

import { TopContent } from './features/todos/components/TopContent';
import { UIMessage } from './features/messages/components/UIMessage';
import { useAppSelector } from './store/hooks';
import { themeSelector } from './features/themes/store/themeSlice';

function App() {
  const { theme } = useAppSelector(themeSelector);

  // console.log('App is rendering');
  return (
    <ErrorBoundary theme={theme}>
      <div
        className={`relative min-h-screen px-3 lg:px-6 ${theme.bgColors.main} ${theme.textColors.main}`}
      >
        <UIMessage />
        <div className="md:w-10/12 lg:w-8/12 mx-auto">
          <Header />
          <main className="py-3 px-2 md:p-5 pb-16">
            <TopContent />
            <Outlet />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
