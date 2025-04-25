"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  loginService,
  logoutService,
  refreshTokenService,
} from "@/app/lib/actions/auth.actions";
import { CurrentUser } from "@/types/user";

type AuthContextType = {
  user: CurrentUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const data = await loginService({ email, password });
    setUser(data);
    localStorage.setItem("authUser", JSON.stringify(data));
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const refresh = async () => {
    const raw = localStorage.getItem("authUser");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    try {
      const updated = await refreshTokenService(parsed.refresh_token);
      const newUser = { ...parsed, ...updated };
      setUser(newUser);
      localStorage.setItem("authUser", JSON.stringify(newUser));
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem("authUser");
    if (raw) {
      setUser(JSON.parse(raw));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        refresh,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
