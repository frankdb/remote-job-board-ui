"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useContext, useEffect } from "react";
import { refreshToken } from "@/services/api";
import api from "@/services/api";
import { User } from "@/types/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (access_token: string, refresh_token: string, user: User) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
  isLoading: boolean;
  handleGoogleSuccess: (tokenResponse: any) => Promise<any>;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [, setAccessToken] = useState<string | null>(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const storedAccessToken = localStorage.getItem("access_token");
      const storedRefreshToken = localStorage.getItem("refresh_token");
      const storedUser = localStorage.getItem("user");

      if (storedAccessToken && storedRefreshToken && storedUser) {
        setAccessToken(storedAccessToken);
        setRefreshTokenValue(storedRefreshToken);
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (access_token: string, refresh_token: string, user: User) => {
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

  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      // Send the access token to your backend
      const response = await api.post("/api/auth/google/", {
        access_token: tokenResponse.access_token,
      });

      // Store tokens
      setAccessToken(response.data.tokens.access);
      setRefreshTokenValue(response.data.tokens.refresh);
      localStorage.setItem("access_token", response.data.tokens.access);
      localStorage.setItem("refresh_token", response.data.tokens.refresh);

      // Set user and authentication state
      setUser(response.data.user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data.user;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        refreshAccessToken,
        isLoading,
        handleGoogleSuccess,
        updateUser,
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
