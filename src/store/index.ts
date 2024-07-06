import type { Models } from 'appwrite';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: Models.Document | null;
  setUser: (user: Models.Document) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
      clearUser: () => set(() => ({ user: null })),
    }),
    { name: 'userStore' }
  )
);
