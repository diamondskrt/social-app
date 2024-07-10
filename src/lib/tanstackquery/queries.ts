import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createPost,
  createUserAccount,
  getCurrentUser,
  signInAccount,
  signOutAccount,
  updatePost,
} from '@/lib/appwrite/api';
import type { NewPost, NewUser, Post } from '@/models';

import { QUERY_KEYS } from './queryKeys';

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

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: NewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: Post) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};
