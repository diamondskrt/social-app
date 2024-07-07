import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';

export function Root() {
  return (
    <div className="md:flex h-screen">
      <Header />
      <Sidebar />
      <main className="flex flex-1 h-full px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
