import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { HomePage, ErrorPage } from './pages/';
import { HelpPage } from './pages/HelpPage';

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
      {
        path: '/help',
        element: <HelpPage />,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
