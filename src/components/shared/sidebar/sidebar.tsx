import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Icon } from '@/components/shared/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { links } from '@/constants';
import { useSignOutAccount } from '@/lib/tanstackquery/queries';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store';

export function Sidebar() {
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.user);

  const { mutateAsync: signOutAccount } = useSignOutAccount();

  const signOut = async () => {
    try {
      await signOutAccount();
      toast.success('Sign-out has been successful.');
      navigate('/auth/sign-in');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="hidden md:flex flex-col justify-between min-w-[270px] shadow px-6 py-8">
      <div className="flex flex-col gap-8">
        <div>Logo</div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={currentUser?.imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base leading-none">{currentUser?.username}</p>
            <p className="text-sm text-gray-500">{currentUser?.email}</p>
          </div>
        </div>
        <ul className="grid gap-2">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.route}
                className={({ isActive }) =>
                  cn(
                    isActive
                      ? 'bg-primary text-white hover:opacity-80'
                      : 'hover:bg-secondary',
                    'flex items-center gap-3 rounded p-2'
                  )
                }
              >
                <Icon name={link.icon} width={20} height={20} />
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
