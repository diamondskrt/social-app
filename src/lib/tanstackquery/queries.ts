import { useMutation } from '@tanstack/react-query';

import {
  createUserAccount,
  getCurrentUser,
  signInAccount,
  signOutAccount,
} from '@/lib/appwrite/api';
import type { NewUser } from '@/models';

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: Omit<NewUser, 'username'>) => signInAccount(user),
  });
};

export const useGetCurrentUser = () => {
  return useMutation({
    mutationFn: () => getCurrentUser(),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: () => signOutAccount(),
  });
};
