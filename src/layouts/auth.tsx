import { Outlet } from 'react-router-dom';

export function Auth() {
  return (
    <div className="flex">
      <section className="flex-center flex-1 flex-col py-10">
        <Outlet />
      </section>

      <img
        src="/images/auth-bg.jpg"
        alt="logo"
        className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </div>
  );
}
