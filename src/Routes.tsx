import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { HomePage, ErrorPage } from './pages/';

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
        path: '/twtimer',
        element: <HomePage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
