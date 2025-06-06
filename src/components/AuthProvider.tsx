"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<{ userData: any, logOut: () => void }>({
  userData: null,
  logOut: () => {},
});
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
      method: "POST",
      credentials: "include",
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then(data => setUserData(data.userData))
      .catch(() => {
        setUserData(null);
      });
  }, []);

  const logOut = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ userData, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
