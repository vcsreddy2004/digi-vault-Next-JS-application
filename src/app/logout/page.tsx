"use client";
import { AuthContext } from '@/components/AuthProvider';
import { useContext, useEffect } from 'react';

export default function LogOut() {
  const auth = useContext(AuthContext);
  useEffect(() => {
    auth.logOut();
  }, [auth]);
  return (
    <div className="text-center mt-10 text-lg text-gray-600">Logging you out...</div>
  );

}