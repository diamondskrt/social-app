import { Outlet } from 'react-router-dom';

export default function Auth() {
  return (
    <main className="flex">
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
      </section>

      <img
        src="/images/auth-bg.jpg"
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </main>
  );
}
