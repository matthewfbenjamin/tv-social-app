import { create } from 'zustand';
import Parse from '../lib/parse';

type AuthStore = {
  user: Parse.User | null;
  setUser: (u: Parse.User | null) => void;
  logout: () => Promise<void>;
};

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: async () => {
      await Parse.User.logOut();
      set({ user: null });
    },
  }));