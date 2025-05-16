import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserItem } from "@/types/user";

interface UserState {
  user: UserItem | null;
  setUser: (user: UserItem) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store", // localStorage key
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
