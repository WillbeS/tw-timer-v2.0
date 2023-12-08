import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { HomePage, ParseTodosPage, HelpPage, ErrorPage } from './pages/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/parse',
        element: <ParseTodosPage />,
      },
      {
        path: '/help',
        element: <HelpPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
