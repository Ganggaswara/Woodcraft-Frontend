"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authLogin, getMe, apiFetch } from "../../lib/api/auth";

type UserRecord = { id: number; name: string; email?: string; role?: "admin" | "customer" };
type User = UserRecord | null;
type AuthContextValue = {
  user: User;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  ready: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadProfile() {
      if (!token) { setUser(null); setReady(true); return; }
      try {
        const r = await getMe() as { user?: UserRecord } | UserRecord;
        const u: UserRecord | null =
          r && typeof r === "object" && "user" in r
            ? ((r as { user?: UserRecord }).user ?? null)
            : (r as UserRecord);
        if (mounted) {
          if (u && typeof u === "object" && "name" in u) {
            const baseUser = u as { id: number; name: string; email?: string };
            try {
              const detail = await apiFetch(`/api/v1/users/${baseUser.id}`) as { user?: UserRecord; role?: UserRecord["role"] };
              const roleVal: UserRecord["role"] = detail.user?.role ?? detail.role;
              setUser({ ...baseUser, role: roleVal === "admin" ? "admin" : "customer" });
            } catch {
              setUser({ ...baseUser });
            }
          } else {
            setUser(null);
          }
        }
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setReady(true);
      }
    }
    loadProfile();
    return () => { mounted = false; };
  }, [token]);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const res = await authLogin(email, password);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        setToken(res.token);
      }
      if (res && (res as { user?: UserRecord }).user) {
        const u = (res as { user?: UserRecord }).user as { id: number; name: string; email?: string };
        setUser(u);
      }
      const r = await getMe().catch(() => null) as { user?: UserRecord } | UserRecord | null;
      const u: UserRecord | null =
        r && typeof r === "object" && "user" in r
          ? ((r as { user?: UserRecord }).user ?? null)
          : (r as UserRecord | null);
      if (u && typeof u === "object" && "name" in u) {
        const baseUser = u as { id: number; name: string; email?: string };
        try {
          const detail = await apiFetch(`/api/v1/users/${baseUser.id}`) as { user?: UserRecord; role?: UserRecord["role"] };
          const roleVal: UserRecord["role"] = detail.user?.role ?? detail.role;
          setUser({ ...baseUser, role: roleVal === "admin" ? "admin" : "customer" });
        } catch {
          setUser(baseUser);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setReady(true);
  }

  const value = useMemo<AuthContextValue>(() => ({ user, token, loading, login, logout, ready }), [user, token, loading, ready]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
