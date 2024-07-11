import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Auth } from '@/layouts/auth';
import { Root } from '@/layouts/root';
import { SignInPage, SignUpPage } from '@/pages/auth';
import { CreatePostPage } from '@/pages/create-post';
import { ErrorPage } from '@/pages/error-page';
import { HomePage } from '@/pages/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'create-post',
        element: <CreatePostPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="sign-in" replace />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
    ],
  },
]);
