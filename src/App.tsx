import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux/';
import { store } from './store/store';
import { Header } from './components/layouts/Header';
import ErrorBoundary from './components/ErrorBoundary';
import { ErrorMessage } from './features/messages/components/ErrorMasage';

import { theme } from './themes';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div
          className={`min-h-screen px-3 lg:px-6 ${theme.bgColors.main} ${theme.textColors.main}`}
        >
          <div className="md:w-10/12 lg:w-8/12 mx-auto">
            <Header />
            <ErrorMessage />
            <main className="py-3 px-2 md:p-5 pb-16">
              <Outlet />
            </main>
          </div>
        </div>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
