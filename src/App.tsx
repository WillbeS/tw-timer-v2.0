import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux/';
import { store } from './store/store';
import { Header } from './components/layouts/Header';
import ErrorBoundary from './components/ErrorBoundary';

import { theme } from './themes';
import { TopContent } from './features/todos/components/TopContent';
import { UIMessage } from './features/messages/components/UIMessage';

//console.log('App is rendering');

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
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
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
