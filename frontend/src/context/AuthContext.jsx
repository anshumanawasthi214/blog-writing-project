"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AUTH_USER_KEY = "blog_user";
const AUTH_TOKEN_KEY = "blog_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setHydrated(true);
  }, []);

  const login = (nextUser, nextToken) => {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
    localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    setUser(nextUser);
    setToken(nextToken);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      hydrated,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, token, hydrated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

export { AUTH_TOKEN_KEY };
