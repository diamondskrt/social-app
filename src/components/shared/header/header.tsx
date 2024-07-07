import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Icon } from '@/components/shared/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useSignOutAccount } from '@/lib/tanstackquery/queries';
import { useUserStore } from '@/store';

import { links } from './constants';

export function Header() {
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
    <div className="md:hidden sticky bg-primary-foreground shadow top-0 z-50 w-full">
      <div className="flex justify-between items-center px-5 py-4">
        <div>Logo</div>

        <Drawer direction="right">
          <DrawerTrigger>
            <Avatar>
              <AvatarImage src={currentUser?.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerDescription asChild className="mt-8">
                <ul className="grid gap-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <NavLink
                        to={link.route}
                        className="pointer-events-none opacity-70 flex items-center gap-3 p-2"
                      >
                        <Icon name={link.icon} width={20} height={20} />
                        <span>{link.label} (disabled)</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>Cancel</DrawerClose>
              <Button className="mt-4" onClick={() => signOut()}>
                Sign out
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
