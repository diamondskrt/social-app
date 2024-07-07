import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  useGetCurrentUser,
  useSignInAccount,
} from '@/lib/tanstackquery/queries';
import { useUserStore } from '@/store';

import { defaultValues, formSchema } from './constants';

export function SignInPage() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutateAsync: signInAccount, isPending: isSignInAccountPending } =
    useSignInAccount();
  const { mutateAsync: getCurrentUser, isPending: isGetCurrentUserPending } =
    useGetCurrentUser();

  const isPending = isSignInAccountPending || isGetCurrentUserPending;

  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    try {
      await signInAccount(user);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      form.reset();
      navigate('/');
      toast.success('Sign-in has been successful.');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-1/2">
        <div className="space-y-2 mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isPending} type="submit">
          Submit
        </Button>

        <p className="text-small-regular text-light-2 mt-2">
          No account?
          <Link
            to="/auth/sign-up"
            className="text-primary text-small-semibold ml-1"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}
