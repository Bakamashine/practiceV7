import { type User } from "./useUser";
import { useState, useEffect, useCallback } from "react";

const isBrowser = typeof window !== "undefined";

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(() => {
    if (!isBrowser) return null;
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) {
          return parsed;
        }
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (!isBrowser) return;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const addUser = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const removeUser = useCallback(() => {
    setUser(null);
  }, []);

  return { user, setUser, addUser, removeUser };
};