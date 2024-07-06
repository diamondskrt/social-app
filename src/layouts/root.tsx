import { Outlet } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';

export default function Root() {
  return (
    <>
      <div className="header">Header</div>
      <Outlet />
      <Toaster position="top-right" richColors />
    </>
  );
}
