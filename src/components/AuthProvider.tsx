"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface User {
  email: string;
  isPro: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  openAuth: () => void;
  closeAuth: () => void;
  showAuth: boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  openAuth: () => {},
  closeAuth: () => {},
  showAuth: false,
  refreshUser: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  const loadUser = useCallback(() => {
    try {
      const stored = localStorage.getItem("colddraft_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email: string) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      const u: User = { email: data.email, isPro: data.isPro };
      setUser(u);
      localStorage.setItem("colddraft_user", JSON.stringify(u));
      setShowAuth(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("colddraft_user");
    fetch("/api/auth", { method: "DELETE" });
  };

  const refreshUser = () => {
    if (user) {
      fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            const u: User = { email: data.email, isPro: data.isPro };
            setUser(u);
            localStorage.setItem("colddraft_user", JSON.stringify(u));
          }
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        openAuth: () => setShowAuth(true),
        closeAuth: () => setShowAuth(false),
        showAuth,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
