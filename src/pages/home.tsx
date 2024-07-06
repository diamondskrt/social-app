import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useSignOutAccount } from '@/lib/tanstackquery/queries';
import { useUserStore } from '@/store';

export default function Home() {
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.user);
  const { mutateAsync: signOutAccount } = useSignOutAccount();

  const signOut = async () => {
    try {
      await signOutAccount();
      navigate('/auth/sign-in');
      toast.success('Sign-out has been successful.');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <div>Home {currentUser?.email}</div>
      <Button onClick={() => signOut()}>Выйти</Button>
    </>
  );
}
