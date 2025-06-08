"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { UserView } from "@/utils/models/users/userView";
interface AuthContextType {
  userData: UserView;
  logOut: () => void;
  getData: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userData: {} as UserView,
  logOut: () => {},
  getData: () => {}
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserView>({} as UserView);
  const router = useRouter();
  console.log(JSON.stringify(userData));
  let getData = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
      method: "GET",
      credentials: "include",
    }).then(res => {
      if (res.ok) return res.json();
      throw new Error("Not authenticated");
    })
    .then(data => {
      if (data) {
        setUserData({
          firstName:data.firstName,
          lastName:data.lastName,
          email:data.email,
          userName:data.userName,
          password:data.password,
          accountNumber:data.accountNumber,
          accountType:data.accountType,
          amount:data.amount,
          errorMessage:"",
          lastLogIn:data.lastLogIn,
        });
      }
      else {
        setUserData({} as UserView);
      }
    })
    .catch(() => {
      setUserData({} as UserView);
    }); 
  }
  useEffect(() => {
    getData();
  }, [router]);

  const logOut = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`, {
      method: "GET",
      credentials: "include",
    });
    setUserData({} as UserView);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ userData, logOut,getData }}>
      {children}
    </AuthContext.Provider>
  );
}
