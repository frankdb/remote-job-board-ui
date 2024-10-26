"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useContext, useEffect } from "react";
import { refreshToken } from "@/services/api";
import api from "@/services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (access_token: string, refresh_token: string, user: any) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [, setAccessToken] = useState<string | null>(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(
    null
  );

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const storedUser = localStorage.getItem("user");
    if (storedAccessToken && storedRefreshToken && storedUser) {
      setAccessToken(storedAccessToken);
      setRefreshTokenValue(storedRefreshToken);
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (access_token: string, refresh_token: string, user: any) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("user", JSON.stringify(user));
    setAccessToken(access_token);
    setRefreshTokenValue(refresh_token);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = async () => {
    try {
      if (refreshTokenValue) {
        await api.post("/api/logout/", { refresh_token: refreshTokenValue });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setAccessToken(null);
      setRefreshTokenValue(null);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const { access, refresh } = await refreshToken(refreshTokenValue!);
      setAccessToken(access);
      setRefreshTokenValue(refresh);
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      return access;
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
