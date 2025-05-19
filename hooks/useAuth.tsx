"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  googleLoginService,
  loginService,
  logoutService,
  refreshTokenService,
} from "@/src/app/lib/actions/auth.actions";
import { CurrentUser } from "@/types/user";

type AuthContextType = {
  user: CurrentUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<CurrentUser>;
  googleLogin: (access_token: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isClient = typeof window !== "undefined";

  const login = async (email: string, password: string) => {
    const data = await loginService({ email, password });
    setUser(data);

    if (isClient) {
      localStorage.setItem("authUser", JSON.stringify(data));
    }
    return data;
  };

  const googleLogin = async (access_token: string) => {
    const data = await googleLoginService({ access_token });
    setUser(data);

    if (isClient) {
      localStorage.setItem("authUser", JSON.stringify(data));
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);

    if (isClient) {
      localStorage.removeItem("authUser"); // Remove from localStorage on client
    }
  };

  const refresh = async () => {
    if (!isClient) return; // Ensure this only runs on client

    const raw = localStorage.getItem("authUser");
    if (!raw) return;

    const parsed = JSON.parse(raw);
    try {
      const updated = await refreshTokenService(parsed.refresh_token);
      const newUser = { ...parsed, ...updated };
      setUser(newUser);

      if (isClient) {
        localStorage.setItem("authUser", JSON.stringify(newUser)); // Update localStorage on client
      }
    } catch {
      logout();
    }
  };

  useEffect(() => {
    if (isClient) {
      const raw = localStorage.getItem("authUser");
      if (raw) {
        setUser(JSON.parse(raw));
      }
      setLoading(false);
    }
  }, [isClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        refresh,
        googleLogin,
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
