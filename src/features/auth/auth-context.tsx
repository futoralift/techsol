"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import type { LoginCredentials, RegisterData, User } from "@/types";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data } = await authApi.me();
      return data.data;
    },
    retry: false,
    enabled: isInitialized,
  });

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      queryClient.setQueryData(["auth", "me"], null);
    };
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [queryClient]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const { data } = await authApi.login(credentials);
      queryClient.setQueryData(["auth", "me"], data.data.user);
    },
    [queryClient]
  );

  const register = useCallback(
    async (registerData: RegisterData) => {
      const { data } = await authApi.register(registerData);
      queryClient.setQueryData(["auth", "me"], data.data.user);
    },
    [queryClient]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      queryClient.setQueryData(["auth", "me"], null);
      queryClient.clear();
    }
  }, [queryClient]);

  const refetchUser = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: user ?? null,
      isLoading: !isInitialized || isLoading,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
      login,
      register,
      logout,
      refetchUser,
    }),
    [user, isInitialized, isLoading, login, register, logout, refetchUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
