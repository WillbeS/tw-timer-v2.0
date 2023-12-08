import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux/';
import { store } from './store/store';
import { Header } from './components/layouts/Header';
import { defaultTheme } from './data/constants';

function App() {
  console.log('App is rendering');

  return (
    <Provider store={store}>
      <div className={`min-h-screen px-3 lg:px-6 ${defaultTheme.bgColor}`}>
        <div className="md:w-10/12 lg:w-8/12 mx-auto">
          <Header />
          <main className="py-3 px-2 md:p-5 text-stone-700 pb-16">
            <Outlet />
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default App;
