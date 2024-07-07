import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';
import { router } from '@/router';

export default function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      <Toaster position="top-right" richColors />
    </>
  );
}
